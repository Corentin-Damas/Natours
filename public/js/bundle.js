// import "@babel/polyfill";
const $a01ad5087aa0d30d$export$516836c6a9dfc573 = ()=>{
    const el = document.querySelector(".alert");
    if (el) el.parentElement.removeChild(el);
};
const $a01ad5087aa0d30d$export$de026b00723010c1 = (type, msg)=>{
    $a01ad5087aa0d30d$export$516836c6a9dfc573();
    const markup = `<div class="alert alert--${type}">${msg}</div>`;
    document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
    window.setTimeout($a01ad5087aa0d30d$export$516836c6a9dfc573, 5000);
};


const $71aa1b7eb6279560$export$596d806903d1f59e = async (email, password)=>{
    try {
        const res = await axios({
            method: "POST",
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            },
            url: "http://127.0.0.1:3000/api/v1/users/login",
            data: {
                email: email,
                password: password
            }
        });
        if (res.status === 200) {
            (0, $a01ad5087aa0d30d$export$de026b00723010c1)("success", "Logged in successfully");
            window.setTimeout(()=>{
                location.assign("/overview");
            }, 1500);
        }
    } catch (err) {
        (0, $a01ad5087aa0d30d$export$de026b00723010c1)("error", err.response.data.message);
    }
};
const $71aa1b7eb6279560$export$a0973bcfe11b05c9 = async ()=>{
    try {
        const res = await axios({
            method: "GET",
            // withCredentials: true, // Include credentials (cookies)
            // headers: {
            //   "Content-Type": "application/json",
            // },
            url: "http://127.0.0.1:3000/api/v1/users/logout"
        });
        if (res.status === 200) location.reload(true);
    } catch (err) {
        (0, $a01ad5087aa0d30d$export$de026b00723010c1)("error", "Error logging out ! Try again");
    }
};


// Client side rendering
const $3c68af49dfc9768d$export$4c5dd147b21b9176 = (locations)=>{
    var map = L.map("map", {
        scrollWheelZoom: false
    }).setView(switchCoordinates(locations[0].coordinates), 6);
    var myIcon = L.icon({
        iconUrl: "../img/pin.png",
        iconSize: [
            31,
            40
        ]
    });
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    locations.forEach((loc)=>{
        L.marker(switchCoordinates(loc.coordinates), {
            icon: myIcon
        }).addTo(map).bindPopup(`<div class='custom-popup'>${loc.description}</div>`).openPopup();
    });
    map.removeControl(map.zoomControl);
    L.control.zoom({
        position: "bottomleft"
    }).addTo(map);
    function switchCoordinates(arr) {
        return [
            arr[1],
            arr[0]
        ];
    }
};



const $8bc100f925d8cfe6$export$f558026a994b6051 = async (data, type)=>{
    try {
        const url = type == "password" ? "http://127.0.0.1:3000/api/v1/users/updateMyPassword" : "http://127.0.0.1:3000/api/v1/users/updateMe";
        const res = await axios({
            method: "PATCH",
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            },
            url: url,
            data: data
        });
        if (res.data.status === "success") (0, $a01ad5087aa0d30d$export$de026b00723010c1)("success", `${type.toUpperCase()} updated successfully ! `);
    } catch (err) {
        (0, $a01ad5087aa0d30d$export$de026b00723010c1)("error", err.response.data.message);
    }
};



const $f56938ec597dd420$var$stripe = Stripe("pk_test_51PciSXDPLnxXe12TOZlaUOf7S7DCVxkxI9WMXiGuf4xj6kACY4dhPVqIvE68iZxChKETUoo5QEP85MNqeAcq6rAW00Y3BvZt8t");
const $f56938ec597dd420$export$8d5bdbf26681c0c2 = async (tourId)=>{
    try {
        const session = await axios(`http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`);
        await $f56938ec597dd420$var$stripe.redirectToCheckout({
            sessionId: session.data.session.id
        });
    } catch (err) {
        (0, $a01ad5087aa0d30d$export$de026b00723010c1)("error", err);
    }
};


const $b6f4712e4c6c8e18$var$mapBox = document.getElementById("map");
const $b6f4712e4c6c8e18$var$loginForm = document.querySelector(".form--login");
const $b6f4712e4c6c8e18$var$logOutBtn = document.querySelector(".nav__el--logout");
const $b6f4712e4c6c8e18$var$userDataForm = document.querySelector(".form-user-data");
const $b6f4712e4c6c8e18$var$userPasswordForm = document.querySelector(".form-user-password");
const $b6f4712e4c6c8e18$var$bookBtn = document.getElementById("book-tour");
const $b6f4712e4c6c8e18$var$bookingTourSelected = document.querySelector(".booking-selection");
const $b6f4712e4c6c8e18$var$bookingLink = document.querySelector(".go-to-booking");
if ($b6f4712e4c6c8e18$var$mapBox) {
    const locations = JSON.parse($b6f4712e4c6c8e18$var$mapBox.dataset.locations);
    (0, $3c68af49dfc9768d$export$4c5dd147b21b9176)(locations);
}
if ($b6f4712e4c6c8e18$var$loginForm) $b6f4712e4c6c8e18$var$loginForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    (0, $71aa1b7eb6279560$export$596d806903d1f59e)(email, password);
});
if ($b6f4712e4c6c8e18$var$logOutBtn) $b6f4712e4c6c8e18$var$logOutBtn.addEventListener("click", (0, $71aa1b7eb6279560$export$a0973bcfe11b05c9));
if ($b6f4712e4c6c8e18$var$userDataForm) $b6f4712e4c6c8e18$var$userDataForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const form = new FormData();
    form.append("name", document.getElementById("name").value);
    form.append("email", document.getElementById("email").value);
    form.append("photo", document.getElementById("photo").files[0]);
    (0, $8bc100f925d8cfe6$export$f558026a994b6051)(form, "data");
});
if ($b6f4712e4c6c8e18$var$userPasswordForm) $b6f4712e4c6c8e18$var$userPasswordForm.addEventListener("submit", async (e)=>{
    e.preventDefault();
    document.querySelector(".btn--save-password").textContent = "Updating";
    const passwordCurrent = document.getElementById("password-current").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("password-confirm").value;
    await (0, $8bc100f925d8cfe6$export$f558026a994b6051)({
        passwordCurrent: passwordCurrent,
        password: password,
        passwordConfirm: passwordConfirm
    }, "password");
    document.querySelector(".btn--save-password").textContent = "Save password";
    document.getElementById("password-current").value = "";
    document.getElementById("password").value = "";
    document.getElementById("password-confirm").value = "";
});
if ($b6f4712e4c6c8e18$var$bookBtn) $b6f4712e4c6c8e18$var$bookBtn.addEventListener("click", (e)=>{
    e.target.textContent = "Processing...";
    const { tourId: tourId } = e.target.dataset;
    (0, $f56938ec597dd420$export$8d5bdbf26681c0c2)(tourId);
});
if ($b6f4712e4c6c8e18$var$bookingTourSelected) {
    const preSelection = $b6f4712e4c6c8e18$var$bookingTourSelected.dataset.tourid;
    $b6f4712e4c6c8e18$var$bookingTourSelected.addEventListener("click", (e)=>{
        e.preventDefault;
        $b6f4712e4c6c8e18$var$bookingLink.href = `http://127.0.0.1:3000/tour/${preSelection}`;
    });
}


//# sourceMappingURL=bundle.js.map
