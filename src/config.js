(function () {
  const e = window.__ENV__ || {};
  window.BMS = window.BMS || {};
  window.BMS.config = {
    appName: e.APP_NAME || "Bank Management System",
    env: e.APP_ENV || "development",
    version: e.APP_VERSION || "0.0.0",
    apiBase: e.API_BASE_URL || "",
    banner: {
      enabled: e.BANNER_ENABLED !== "false",
      message: e.BANNER_MESSAGE || "",
      maintenanceStart: e.BANNER_MAINTENANCE_START || "",
      maintenanceEnd: e.BANNER_MAINTENANCE_END || ""
    }
  };
})();
