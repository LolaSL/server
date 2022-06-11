const button = document.querySelector("button")
button.addEventListener("click", () => {
    console.log("Checkout")
    fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({

            product_data: {
                name: 'T-shirt', unit_amount: 2000, quantity: 1
            },
        }),
    })
        .then(async res => {
            if (res.ok) return res.json()
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