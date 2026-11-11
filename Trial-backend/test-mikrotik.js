
const REST_TIMEOUT = 10000;

async function addPPPoEAccount({ username, password, profile }) {
  const host = process.env.MIKROTIK_HOST;
  const port = process.env.MIKROTIK_REST_PORT || '80';
  const user = process.env.MIKROTIK_USER;
  const routerPassword = process.env.MIKROTIK_PASSWORD;

  if (!host || !user || !routerPassword) {
    throw new Error('Missing MikroTik REST API credentials');
  }

  const authorization = Buffer.from(
    `${user}:${routerPassword}`
  ).toString('base64');

  const url = `http://${host}:${port}/rest/ppp/secret`;

  try {
    console.log('Connecting to MikroTik REST API...');

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${authorization}`,
      },
      body: JSON.stringify({
        name: username,
        password,
        service: 'pppoe',
        profile,
      }),
      signal: AbortSignal.timeout(REST_TIMEOUT),
    });

    const responseText = await response.text();

    if (!response.ok) {
      console.error('MikroTik REST error:', {
        status: response.status,
        response: responseText,
      });

      const error = new Error(
        `MikroTik REST API returned HTTP ${response.status}`
      );

      error.status = response.status === 409 ? 409 : 502;

      throw error;
    }

    console.log('PPPoE account created:', username);

    return {
      username,
      profile,
    };

  } catch (error) {
    console.error('PPPoE creation failed:', error.message);
    throw error;
  }
}

module.exports = { addPPPoEAccount };
