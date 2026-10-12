const RATES_URL = "https://open.er-api.com/v6/latest/USD";

export async function fetchExchangeRates() {
    let response;
    try {
        response = await fetch(RATES_URL);
    } catch (error) {
        throw new Error("Could not reach the exchange-rate service. Check your connection and retry.", { cause: error });
    }

    if (!response.ok) {
        throw new Error(`Exchange-rate service returned HTTP ${response.status}.`);
    }

    let payload;
    try {
        payload = await response.json();
    } catch (error) {
        throw new Error("Exchange-rate service returned invalid JSON.", { cause: error });
    }

    if (payload?.result !== "success" || !payload.rates || typeof payload.rates !== "object") {
        throw new Error("Exchange-rate service returned an unsuccessful or invalid response.");
    }

    return { ...payload.rates, USD: 1 };
}
