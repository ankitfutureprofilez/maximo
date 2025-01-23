import React, { useEffect, useRef } from 'react';
import * as powerbi from 'powerbi-client';

const PowerBIReport = () => {
    const reportContainerRef = useRef(null);

    useEffect(() => {
        if (reportContainerRef.current) {
            const embedConfig = {
                type: 'report',
                id: 'YOUR_REPORT_ID',
                embedUrl: 'YOUR_EMBED_URL',
                accessToken: 'YOUR_ACCESS_TOKEN',
                tokenType: powerbi.models.TokenType.Embed,
                settings: {
                    filterPaneEnabled: false,
                    navContentPaneEnabled: false
                }
            };
            const report = powerbi.embed(reportContainerRef.current, embedConfig);
        }
    }, []);

    return <div ref={reportContainerRef} style={{ height: '500px', width: '100%' }} />;
};

export default PowerBIReport;
