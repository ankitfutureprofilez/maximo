import React from 'react';
import { PowerBIEmbed } from '@microsoft/powerbi-react';

const App = () => {
  return (
    <div>
      <PowerBIEmbed
        embedUrl="YOUR_EMBED_URL"
        accessToken="YOUR_ACCESS_TOKEN"
      />
    </div>
  );
};

export default App;
