export const trackEvent = (action, payload) => {
    // let params = {}
    // if (payload?.sourceName) { params.source_name = payload?.sourceName }
    // if (payload?.userId) { params.userId = payload?.userId }
    window?.gtag("event", action);
};