import React, { useEffect, useState } from 'react'

const CurrencyConverter = () => {
    const URL = 'https://v6.exchangerate-api.com/v6/ed6b4a183963d487ef8622d2/latest/USD';

    const [amount1, setAmount1] = useState('');
    const [amount2, setAmount2] = useState('');
    const [currency1, setCurrency1] = useState('USD');
    const [currency2, setCurrency2] = useState('BDT');
    const [exchangerate, setExchangerate] = useState({});

    const fetchExchangeRates = async () => {
        try {
            const response = await fetch(URL);
            // console.log(response)
            const data = await response.json();
            setExchangerate(data.conversion_rates || {})
            console.log(data);
        } catch {
            console.log('error fetching');
        }
    }
    useEffect(() => {
        fetchExchangeRates();
    }, [])

    //currency converter funcions
    const convertCurrency = (amount, fromCurrency, toCurrency) => {
        if (fromCurrency === toCurrency) return amount;

        const rate = exchangerate[toCurrency] / exchangerate[fromCurrency];
        return (amount * rate).toFixed(2);
    }

    useEffect(() => {
        if (exchangerate[currency1] && exchangerate[currency2]) {
            const convertedAmount = convertCurrency(amount1, currency1, currency2);
            setAmount2(convertedAmount);
        }
    }, [amount1, currency1, currency2, exchangerate])
    return (
        <div className='flex flex-row mt-10 gap-5 '>
            <div className=' border-black border-2 rounded-lg p-1'>
                <select className='bg-black text-red-500 py-1 rounded-md'
                    value={currency1}
                    onChange={(e) => setCurrency1(e.target.value)}
                >
                    {Object.keys(exchangerate).map((country) => (
                        <option key={country} value={country}>
                            {country}
                        </option>
                    ))}
                </select>
                <input type='number' className='ml-3 pl-5  p-1 rounded-md outline-none' value={amount1} onChange={(e) => setAmount1(e.target.value)} />
            </div>
            <div className=' border-black border-2 rounded-lg p-1'>
                <select className='bg-black text-green-500 py-1 rounded-md'
                    value={currency2}
                    onChange={(e) => setCurrency2(e.target.value)}
                >
                    {Object.keys(exchangerate).map((country) => (
                        <option key={country} value={country}>
                            {country}
                        </option>
                    ))}
                </select>
                <input type='number' className='ml-3 pl-5  p-1 rounded-md outline-none' value={amount2} onChange={(e) => setAmount2(e.target.value)} />
            </div>
        </div>
    )
}

export default CurrencyConverter