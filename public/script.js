const button = document.querySelector("button")
button.addEventListener("click", () => {
    console.log("Checkout")
    fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            items: [
                { id: 1, quantity: 3 },
                { id: 2, quantity: 1 },
                {
                    id: 3, quantity: 2
                },
            ],
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
        .catch((e) => {
            console.error(e.message)
        })
})