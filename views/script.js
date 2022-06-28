const button = document.querySelector("button")
button.addEventListener("click", () => {
    console.log("Checkout")
    fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        credentials: 'include', 
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            product_data: {
                name: "T-shirt",
                unit_amount: 20,
                quantity: 1
            },
        }),
    })
        .then(async res => {
            if (res.ok) return res.json()
            console.log(res.json())
            const json = await res.json()
            return await Promise.reject(json)
            
        })
        .then(({ url }) => {
            window.location = url
        })
        .catch((err) => {
            console.log(err.message)
        })
})