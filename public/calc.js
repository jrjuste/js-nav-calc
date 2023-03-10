const LOGIN_PAGE = "/DCSE/secure/Login_input"
  , LOGOUT_PAGE = "/DCSE/secure/Login_logout"
  , LOGOUT_IE_BROWSER = "/DCSE/secure/Login_blocked"
  , LOGIN_ACCESS_DENIED = "/DCSE/secure/Login_accessdenied"
  , LOGIN_KILL_SESSION = "/DCSE/secure/Login_killSession"
  , UPGRADE_BROWSER = "/DCSE/UpgradeBrowser"
  , CREATE_ACCOUNT = "/DCSE/CreateAccount"
  , VIEW_PAYMENTS = "/DCSE/secure/ViewPayments"
  , SECOND = 1E3
  , MINUTE = 60 * SECOND
  , HOUR = 60 * MINUTE
  , DAY = 24 * HOUR
  , TIME_LIMIT = 1 * HOUR
  , WARN_OFFSET = MINUTE
  , BUFFER = 500
  , CHECK = SECOND
  , LIFE = MINUTE
  , LIFESPAN = 2 * MINUTE
  , OKTA_MAX = 2 * HOUR
  , STORE_TIME = "_csActiveTime"
  , STORE_EXPIRE = "_csExpireTime"
  , STORE_LOGOUT = "_csLogOutTime"
  , ALERT_MSG = "You have been logged out due to inactivity. Please log in again."
  , EVENTS = "mousedown mousemove scroll keypress resize touchstart click touchmove mousewheel".split(" ")
  , MENU_EVENTS = ["touchend", "click"]
  , DCSE_COOKIES = ["DCSECookieMultiCase", "DCSECookieMasterAccount", "DCSECookieLogin", "DCSECookieRoleID"]
  , DEBUG_MODE = !0
  , HIDE_ROLE_LINKS = !1;
var EnvEnum = Object.freeze({
    PROD: {
        timelimit: 1 * HOUR,
        isEnv: function() {
            return -1 == location.hostname.search("(localhost|sit|uat|pseudo)")
        }
    },
    PSEUDO: {
        timelimit: 1 * HOUR,
        isEnv: function() {
            return location.hostname.startsWith("pseudo")
        }
    },
    UAT: {
        timelimit: 1 * HOUR,
        isEnv: function() {
            return location.hostname.startsWith("uat")
        }
    },
    SIT: {
        timelimit: 5 * MINUTE,
        isEnv: function() {
            return location.hostname.startsWith("sit")
        }
    },
    LOCAL: {
        timelimit: 5 * MINUTE,
        isEnv: function() {
            return "localhost" == location.hostname
        }
    }
}), timelimit, cookieMap = {}, _eventHandlers = {}, bufferTimer, checkInterval, lifeInterval, includeInterval, multiCase, masterAccount, loggedIn, cpRole, ncpRole, menuUpdate = !1, menuListen = !1;
function updateMenu() {
    debug("Updating Menu");
    menuUpdate ? debug("Menu already updated") : (menuUpdate = !0,
    parseCookies(),
    HIDE_ROLE_LINKS && (cpRole || $('[data-role-required="cp"]').remove(),
    ncpRole || $('[data-role-required="ncp"]').remove()),
    masterAccount ? $("#select").replaceWith('<li id="select"><a href="/DCSE/secure/Login_masterSelectSsn" title="Select SSN">Select SSN</a></li>') : $("#select").remove(),
    multiCase && loggedIn ? $("#my-accounts").replaceWith('<li id="my-accounts"><a href="/DCSE/secure/Login" title="My Accounts">My Accounts</a></li>') : $("#my-accounts").remove(),
    $(".log-in-out").replaceWith(getLogMenuItem()))
}
function getLogMenuItem() {
    if (loggedIn) {
        var a = LOGOUT_PAGE;
        var b = "Log Out";
        var c = "Log out"
    } else
        a = LOGIN_PAGE,
        b = "Login",
        c = "Log in";
    return '<li id="log-in-out"><a href="' + getLogoutPath(a) + '" title="' + b + '">' + c + "</a></li>"
}
function cleanupMenu() {
    debug("Cleaning up menu");
    $("#select").remove();
    $("#my-accounts").remove();
    $("#log-out").replaceWith(getLogMenuItem())
}
function activityTracker() {
    parseCookies();
    loggedIn ? (debug("Logged in"),
    loadExpireCheck() ? (debug("Expired on load"),
    forceLogoff(Date.now())) : startMonitoring()) : location.pathname == LOGOUT_PAGE ? (debug("On the logout page"),
    hasLogout() || (setLogout(Date.now()),
    debug("Setting logout time from logout page")),
    hasExpire() || debug("Session didn't expire.")) : (debug("Not logged in"),
    setTimeout(resetTimes, SECOND + BUFFER))
}
function loadExpireCheck() {
    var a = isExpired(getTimeLimit())
      , b = !1;
    isExpired(OKTA_MAX) && (debug("Previous Okta session expired. This is a new one."),
    b = !0);
    hasLogout() ? (b = !0,
    hasExpire() ? debug("They were force logged out the last session. This is a new one.") : debug("They manually logged out last session. This is a new one.")) : hasExpire() && debug("Their session expired but they never logged out.");
    b && (a ? (debug("Previous session expired but they have logged back in."),
    a = !1) : debug("Previous session hasn't expired."),
    debug("Clearing storage."),
    clearStorage());
    return a
}
function activeExpireCheck() {
    var a = isExpired(getTimeLimit());
    a && hasExpire() && (hasLogout() ? debug("Expired and logged off since last check.") : debug("Expired but not logged off since last check."));
    return a
}
function ieCheck() {
    var a = window.navigator.userAgent;
    return -1 != a.indexOf("MSIE") || -1 != a.indexOf("Trident")
}
function detectIEbrowser() {
    ieCheck() && (parseCookies(),
    location.pathname != LOGIN_PAGE && -1 != location.pathname.indexOf("/Login_") || -1 != location.pathname.indexOf("/Error") || -1 != location.pathname.indexOf("/UpgradeBrowser") || -1 != location.pathname.indexOf("/LoginBlocked") ? debug("On a white-listed page.") : loggedIn || 0 == location.pathname.indexOf("/DCSE/secure") && location.pathname != LOGIN_PAGE ? goToPage(getLogoutPath(LOGOUT_IE_BROWSER)) : ieMessage())
}
function ieMessage() {
    var a = $('<ul class="error"></ul>')
      , b = $("<input />", {
        type: "button",
        "class": "button",
        value: "Upgrade browser",
        id: "upgradeBtn",
        alt: "Upgrade your browser",
        title: "Upgrade your browser",
        tabindex: "0",
        on: {
            click: function() {
                goToPage(UPGRADE_BROWSER)
            }
        }
    })
      , c = $("<li />");
    c.append("Internet Explorer is unsupported, and you will not be able to log in. Please upgrade your browser. ", b);
    a.append(c);
    $("#content h1").after(a)
}
function startMonitoring() {
    debug("Starting monitor process");
    setTime(Date.now());
    startListening();
    checkInterval = setInterval(check, SECOND)
}
function check() {
    if (activeExpireCheck()) {
        debug("Expired on check");
        var a = Date.now();
        hasExpire() || setExpire(a);
        stopMonitoring(a)
    }
}
function stopMonitoring(a) {
    debug("Stopping monitor process");
    debug("Clearing intervals");
    clearInterval(checkInterval);
    endSession(a)
}
function endSession(a) {
    debug("Ending session");
    var b = getCurPage();
    b.secure ? forceLogoff(a ? a : b.time) : (clearDCSECookies(),
    cleanupMenu(),
    hasLogout() && stopListening())
}
function forceLogoff(a) {
    debug("Forcing log off");
    hasLogout() || setLogout(a);
    goToPage(getLogoutPath(LOGOUT_PAGE))
}
function activity() {
    if (hasExpire()) {
        if (hasLogout()) {
            stopListening();
            return
        }
        forceLogoff(Date.now())
    }
    bufferTimer && clearTimeout(bufferTimer);
    bufferTimer = setTimeout(activityUpdate, BUFFER)
}
function activityUpdate() {
    var a = getCurPage();
    setTime(a.time)
}
function resetTimes() {
    debug("Resetting times");
    hasTime() ? (debug("Activity time found"),
    hasExpire() ? (debug("Expiration time found"),
    hasLogout() ? debug("Kick time found") : debug("No Kick time found")) : debug("No Expiration time found")) : debug("No activity time found");
    clearStorage()
}

function setUpMenu() {
    includeInterval = setInterval(()=>{
        0 == getIncludeTargets().length && (debug("All data sources loaded. Setting up menu."),
        clearInterval(includeInterval),
        updateMenu(),
        listenToMenu())
    }
    , 100)
}
function listenToMenu() {
    if (menuListen)
        debug("Menu already has listeners added");
    else {
        menuListen = !0;
        let a = $("#nys-menu-control")
          , b = $("#nys-global-nav");
        if (b) {
            let c = b.children().filter(function(d, e) {
                return e.children && 1 < e.children.length
            });
            MENU_EVENTS.forEach(function(d) {
                c.each(function(e, f) {
                    f.firstElementChild.addEventListener(d, function(g) {
                        toggleSubMenus(f)
                    })
                });
                a[0] && a[0].addEventListener(d, function(e) {
                    toggleMainMenu(!0);
                    e.preventDefault();
                    e.stopPropagation();
                    return !1
                });
                document.addEventListener(d, function(e) {
                    isParentActive(e.target) || toggleMainMenu();
                    if ("#" == e.target.getAttribute("href"))
                        return e.preventDefault(),
                        e.stopPropagation(),
                        !1
                })
            })
        } else
            menuListen = menuUpdate = !1,
            debug("Menu not added yet, resetting flags")
    }
}
function toggleSubMenus(a) {
    let b = $("#nys-global-nav");
    isActive(a) ? b.children().removeClass("active hidden") : (b.children().removeClass("active"),
    b.children().addClass("hidden"),
    a.className = "active")
}
function toggleMainMenu(a) {
    let b = $("#nys-menu-control")
      , c = $("#nys-global-nav");
    isActive(c) ? (b.removeClass("active"),
    c.removeClass("active")) : a && (b.addClass("active"),
    c.addClass("active"));
    c.children().removeClass("active hidden")
}
function isActive(a) {
    return $(a).hasClass("active")
}
function isParentActive(a) {
    return $(a).is(".active *")
}
function addListener(a, b, c, d) {
    b in _eventHandlers || (_eventHandlers[b] = []);
    _eventHandlers[b].push({
        node: a,
        handler: c,
        capture: d
    });
    a.addEventListener(b, c, d)
}
function removeAllListeners(a, b) {
    _eventHandlers[b].forEach(function(c) {
        c.node === a && c.node.removeEventListener(b, c.handler, c.capture)
    })
}
function startListening() {
    debug("Starting listeners");
    EVENTS.forEach(function(a) {
        addListener(document, a, activity, !0)
    })
}
function stopListening() {
    debug("Stopping listeners");
    EVENTS.forEach(function(a) {
        removeAllListeners(document, a)
    })
}
function clearStorage() {
    debug("Clearing local storage");
    localStorage.clear()
}
function clearExpire() {
    localStorage.removeItem(STORE_EXPIRE)
}
function getExpire() {
    return localStorage.getItem(STORE_EXPIRE)
}
function hasExpire() {
    return localStorage.hasOwnProperty(STORE_EXPIRE)
}
function setExpire(a) {
    localStorage.setItem(STORE_EXPIRE, a)
}
function clearLogout() {
    localStorage.removeItem(STORE_LOGOUT)
}
function getLogout() {
    return localStorage.getItem(STORE_LOGOUT)
}
function hasLogout() {
    return localStorage.hasOwnProperty(STORE_LOGOUT)
}
function setLogout(a) {
    localStorage.setItem(STORE_LOGOUT, a)
}
function clearTime() {
    debug("Clearing time");
    localStorage.removeItem(STORE_TIME)
}
function getTime() {
    return localStorage.getItem(STORE_TIME)
}
function hasTime() {
    return localStorage.hasOwnProperty(STORE_TIME)
}
function setTime(a) {
    localStorage.setItem(STORE_TIME, a)
}
function parseCookies() {
    isEmptyObject(cookieMap) && (document.cookie.split(";").forEach(function(a) {
        parts = a.split("=");
        cookieMap[parts[0].trim()] = 1 < parts.length ? parts[1].trim() : ""
    }),
    multiCase = "true" == cookieMap.DCSECookieMultiCase,
    masterAccount = "true" == cookieMap.DCSECookieMasterAccount,
    loggedIn = "success" == cookieMap.DCSECookieLogin,
    cpRole = "DCSE_PARENT_CUSTODIAL_ROLE" == cookieMap.DCSECookieRoleID,
    ncpRole = "DCSE_PARENT_NON_CUSTODIAL_ROLE" == cookieMap.DCSECookieRoleID)
}
function clearDCSECookies() {
    DCSE_COOKIES.forEach(function(a) {
        deleteCookie(a)
    });
    cookieMap = {};
    ncpRole = cpRole = loggedIn = masterAccount = multiCase = !1
}
function createCookie(a, b, c) {
    var d = "";
    c && (d = new Date,
    d.setTime(d.getTime() + c * DAY),
    d = "expires=" + d.toUTCString() + ";");
    document.cookie = a + "=" + b + "; " + d + " path=/; secure=true;"
}
function cookieExists(a) {
    return -1 != document.cookie.indexOf(a) ? !0 : !1
}
function readCookie(a) {
    var b = "";
    a += "=";
    0 < document.cookie.length && (offset = document.cookie.indexOf(a),
    -1 != offset && (offset += a.length,
    end = document.cookie.indexOf(";", offset),
    -1 == end && (end = document.cookie.length),
    b = unescape(document.cookie.substring(offset, end))));
    return b
}
function deleteCookie(a) {
    cookieExists(a) && createCookie(a, "null", -1)
}
function getCurPage() {
    var a = location.pathname;
    return {
        name: a,
        secure: isSecurePage(a),
        time: Date.now()
    }
}
function isSecurePage(a) {
    let b = [LOGIN_PAGE, LOGOUT_PAGE];
    return a.startsWith("/DCSE/secure") && !b.includes(a) && !a.includes("/Error")
}
function getTimeLimit() {
    if (!timelimit) {
        var a = getEnv();
        timelimit = a && a.timelimit && 0 < a.timelimit ? a.timelimit : TIME_LIMIT;
        debug("Timelimit is " + timelimit)
    }
    return timelimit
}
function getWarnLimit() {
    return getTimeLimit() - MINUTE
}
function isExpired(a) {
    if (localStorage.hasOwnProperty(STORE_TIME)) {
        const b = parseInt(getTime());
        if (0 < b && Date.now() - b > a)
            return !0
    }
    return !1
}
function getLogoutPath(a) {
    return EnvEnum.LOCAL.isEnv() ? a : "/DCSE/secure/redirect?logout=" + encodeURIComponent(getFullPath(a))
}
function getNyGovLogout() {
    return EnvEnum.PROD.isEnv() ? "https://login.ny.gov/login/signout?fromURI=https://sso.ny.gov/affwebservices/public/logout/logoutredirect.html?TARGET=" + getFullPath(LOGIN_PAGE) : "https://login-qa.ny.gov/login/signout?fromURI=https://qa-sso.ny.gov/affwebservices/public/logout/logoutredirect.html?TARGET=" + getFullPath(LOGIN_PAGE)
}
function getEnv() {
    return "localhost" == location.hostname ? EnvEnum.LOCAL : location.hostname.startsWith("sit") ? EnvEnum.SIT : location.hostname.startsWith("uat") ? EnvEnum.UAT : EnvEnum.PROD
}
function goToPage(a) {
    location.href = a
}
function logout(a) {
    goToPage(getLogoutPath(a))
}
function getIncludeTargets() {
    return $("[data-src]")
}
function includeFiles() {
    getIncludeTargets().each(function() {
        var a = $(this).data("src");
        debug(`including ${a}`);
        $.get(a, b=>{
            $(this).replaceWith(b)
        }
        )
    })
}
function swapDir() {
    document.dir = document.dir ? "" : "rtl"
}
function debug(a) {
    DEBUG_MODE && !EnvEnum.PROD.isEnv() && console.log(a)
}
function getRootSite() {
    return location.host.replace(/^(www\.)?([a-z]{2}\.)?/, "")
}
function getFullPath(a) {
    return `${location.protocol}//${getRootSite()}${a}`
}
function isEmptyObject(a) {
    return a && 0 === Object.keys(a).length && a.constructor === Object
}
;