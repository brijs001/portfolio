function doPost(event) {
  var params = event && event.parameter ? event.parameter : {};
  var token = typeof params.submissionToken === "string" ? params.submissionToken : "";

  if (!/^[a-zA-Z0-9-]{10,64}$/.test(token)) {
    return contactResult(false, "");
  }

  if (params.website) {
    return contactResult(false, token);
  }

  var name = cleanField(params.name);
  var email = cleanField(params.email).toLowerCase();
  var message = cleanField(params.message);
  var inquiryType = params.inquiryType === "Consulting inquiry"
    ? "Consulting inquiry"
    : params.inquiryType === "Product leadership opportunity"
      ? "Product leadership opportunity"
      : "Portfolio inquiry";

  if (
    !name ||
    name.length > 100 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    email.length > 254 ||
    !message ||
    message.length > 5000
  ) {
    return contactResult(false, token);
  }

  var recipient = PropertiesService.getScriptProperties().getProperty("RECIPIENT_EMAIL");
  if (!recipient || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient)) {
    console.error("RECIPIENT_EMAIL script property is missing or invalid.");
    return contactResult(false, token);
  }

  var lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) {
    return contactResult(false, token);
  }

  try {
    var cache = CacheService.getScriptCache();
    var cacheKey = "contact-" + emailDigest(email);
    if (cache.get(cacheKey)) {
      return contactResult(false, token);
    }

    try {
      MailApp.sendEmail({
        to: recipient,
        replyTo: email,
        subject: inquiryType + " — Portfolio contact",
        body: "Name: " + name + "\nEmail: " + email + "\nInquiry type: " + inquiryType + "\n\n" + message
      });
    } catch (error) {
      console.error("Contact email delivery failed: " + error.message);
      return contactResult(false, token);
    }

    cache.put(cacheKey, "sent", 60);
    return contactResult(true, token);
  } finally {
    lock.releaseLock();
  }
}

function cleanField(value) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function emailDigest(email) {
  var digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, email);
  return digest.map(function (byte) {
    return ("0" + ((byte + 256) % 256).toString(16)).slice(-2);
  }).join("");
}

function contactResult(success, token) {
  var safeToken = JSON.stringify(token);
  var html = '<!doctype html><html><head><meta charset="utf-8"></head><body>' +
    '<script>window.top.postMessage({type:"portfolio-contact-result",token:' +
    safeToken + ",success:" + (success ? "true" : "false") +
    '}, "*");</script></body></html>';

  return HtmlService.createHtmlOutput(html)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
