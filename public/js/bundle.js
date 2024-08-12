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
        const url = type == "password" ? "http://127.0.0.1:3000/api/v1/users/updateMyPassword" : type == "review" ? `http://127.0.0.1:3000/api/v1/reviews/${data.id}` : type == "tour" ? `http://127.0.0.1:3000/api/v1/tours/${data.id}` : type == "userEdit" ? `http://127.0.0.1:3000/api/v1/users/${data.id}` : "http://127.0.0.1:3000/api/v1/users/updateMe";
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
        console.log(err.response);
        (0, $a01ad5087aa0d30d$export$de026b00723010c1)("error", err.response.data.message);
    }
};
const $8bc100f925d8cfe6$export$b0d8b865196f9f1a = async (id, type)=>{
    console.log(id);
    try {
        const url = `http://127.0.0.1:3000/api/v1/reviews/${id}`;
        const res = await axios({
            method: "DELETE",
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            },
            url: url
        });
        if (res.data.status === "success") (0, $a01ad5087aa0d30d$export$de026b00723010c1)("success", `${type.toUpperCase()} DELETION successfully ! `);
    } catch (err) {
        console.log(err.response);
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
const $b6f4712e4c6c8e18$var$reviewDataForm = document.querySelector(".form-edit-review");
const $b6f4712e4c6c8e18$var$tourDataForm = document.querySelector(".form-edit-tour");
const $b6f4712e4c6c8e18$var$userPasswordForm = document.querySelector(".form-user-password");
const $b6f4712e4c6c8e18$var$bookBtn = document.getElementById("book-tour");
const $b6f4712e4c6c8e18$var$deleteBtn = document.querySelector(".btn-reviews-delete");
const $b6f4712e4c6c8e18$var$bookingTourSelected = document.querySelector(".booking-selection");
const $b6f4712e4c6c8e18$var$saveTourEditBtn = document.querySelector(".btn-save-edit");
const $b6f4712e4c6c8e18$var$bookingLink = document.querySelector(".go-to-booking");
const $b6f4712e4c6c8e18$var$saveUserEdit = document.querySelector(".form--management-users");
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
if ($b6f4712e4c6c8e18$var$reviewDataForm) $b6f4712e4c6c8e18$var$reviewDataForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const id = JSON.parse($b6f4712e4c6c8e18$var$reviewDataForm.dataset.id);
    const review = document.getElementById("review").value;
    const rating = document.getElementById("rating").value;
    (0, $8bc100f925d8cfe6$export$f558026a994b6051)({
        id: id,
        rating: rating,
        review: review
    }, "review");
    window.setTimeout(()=>{
        location.assign("/my-reviews");
    }, 1500);
});
if ($b6f4712e4c6c8e18$var$deleteBtn) $b6f4712e4c6c8e18$var$deleteBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    const id = JSON.parse($b6f4712e4c6c8e18$var$deleteBtn.dataset.id);
    (0, $8bc100f925d8cfe6$export$b0d8b865196f9f1a)(id, "review");
    window.setTimeout(()=>{
        location.assign("/my-reviews");
    }, 1000);
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
// Manage tour data edit form
if ($b6f4712e4c6c8e18$var$tourDataForm) document.addEventListener("DOMContentLoaded", function() {
    const addDateButton = document.getElementById("addDate");
    const addLocationButton = document.getElementById("addLocation");
    const datesSection = document.querySelector(".form-tour-dates");
    const locationsSection = document.querySelector(".form-tour-locations");
    const tourData = JSON.parse($b6f4712e4c6c8e18$var$tourDataForm.dataset.tour);
    let currentIdxDates = tourData.startDates.length;
    let currentIdxLocation = tourData.locations.length;
    //  ADD new DATE input
    addDateButton.addEventListener("click", function() {
        const newDateGroup = document.createElement("div");
        newDateGroup.className = "form__group";
        newDateGroup.innerHTML = `
      <label class="form__label form__label-tour" for="startDates-${currentIdxDates}"> New Date:</label>
      <div class="form__crud" >
      <input  class="form__input-dates" type="datetime-local" id="startDates-${currentIdxDates}" name="startDates-${currentIdxDates}" min="${tourData.calendareData.minDateTime}" max="${tourData.calendareData.maxDateTime}" value="${tourData.calendareData.minDateTime}">
      <button type="button" class="removeDate btn-crud" data-idx="${currentIdxDates}">Remove</button>
      </div>
    `;
        datesSection.appendChild(newDateGroup);
        currentIdxDates++;
    });
    // ADD new LOCATIONS input
    addLocationButton.addEventListener("click", function() {
        const newLocationDiv = document.createElement("div");
        newLocationDiv.className = "form__group two-col border-bot";
        newLocationDiv.id = `loc-${currentIdxLocation}`;
        newLocationDiv.dataset.tourLocation = "";
        newLocationDiv.innerHTML = `        
        <div> 
            <label class="form__label form__label-tour" for="pos-${currentIdxLocation}"> Longitude </label>
            <input class="form__input form__input-tour" type="number" id="pos-${currentIdxLocation}" name="pos-${currentIdxLocation}" value="0")/>
        </div> 
        <div> 
            <label class="form__label form__label-tour" for="lat-${currentIdxLocation}")> Latitude </label>
            <input  class="form__input form__input-tour" type="number" id="lat-${currentIdxLocation}" name="lat-${currentIdxLocation}" value="0")/>
        </div> 
        <div>
            <label class="form__label form__label-tour" for="desciption-${currentIdxLocation}"> Description </label>
            <input class="form__input form__input-tour" type="text" id="desciption-${currentIdxLocation}" placeholder="Place name or small description" name="desciption-${currentIdxLocation}" )/>
        </div> 
        <div> 
            <label class="form__label form__label-tour" for="days-${currentIdxLocation}"> Number of days </label>
            <input class="form__input form__input-tour" type="number" id="days-${currentIdxLocation}" name="days-${currentIdxLocation}" value="1")/>
        </div> 
        <button type="button" class="btn-crud btn-loc removeLocation" id="removeLocation" data-idxloc="${currentIdxLocation}"> Remove Location </button>   
    `;
        locationsSection.appendChild(newLocationDiv);
        currentIdxLocation++;
    });
    //  REMOVE: DATE, LOCATION
    $b6f4712e4c6c8e18$var$tourDataForm.addEventListener("click", function(event) {
        if (event.target && event.target.classList.contains("removeDate")) {
            const idx = event.target.getAttribute("data-idx");
            const dateGroup = document.getElementById(`startDates-${idx}`).closest(".form__group");
            dateGroup.remove();
            currentIdxDates--;
        } else if (event.target && event.target.classList.contains("removeLocation")) {
            const idx = event.target.getAttribute("data-idxloc");
            const dateGroup = document.getElementById(`loc-${idx}`).closest(".form__group");
            dateGroup.remove();
            currentIdxLocation--;
        }
    });
    // PATCH the tour
    $b6f4712e4c6c8e18$var$saveTourEditBtn.addEventListener("click", (e)=>{
        // Collect all the data
        const id = tourData.id;
        const name = document.getElementById("mainTitle").value;
        const slug = name.toLowerCase().split(" ").join("-");
        const duration = document.getElementById("duration").value;
        const difficulty = document.getElementById("difficulty").value;
        const price = document.getElementById("price").value;
        const maxGroupSize = document.getElementById("groupeSize").value;
        const imageCover = document.getElementById("coverImg").value;
        const summary = document.getElementById("summary").value;
        const description = document.getElementById("description").value;
        const tourImgInputs = document.querySelectorAll("input[data-tour-img]");
        const images = Array.from(tourImgInputs).map((input)=>input.value);
        const tourGuidesInputs = document.querySelectorAll("input[data-tour-guide]");
        const guides = Array.from(tourGuidesInputs).filter((checkbox)=>checkbox.checked).map((checkbox)=>checkbox.id);
        const tourDatesInputs = document.querySelectorAll("input[data-tour-date]");
        const startDates = Array.from(tourDatesInputs).map((input)=>input.value);
        // startLocation missing here
        const startingLocationGroup = document.getElementById("startingLocation");
        const startLocation = {
            type: "Point",
            coordinates: [
                startingLocationGroup.querySelector('input[name="StartingPosLong"]').value,
                startingLocationGroup.querySelector('input[name="StartingPosLat"]').value
            ],
            address: startingLocationGroup.querySelector('input[name="StartingPosAddrs"]').value,
            description: startingLocationGroup.querySelector('input[name="StartingPosdesc"]').value
        };
        const tourLocationGroups = document.querySelectorAll("[data-tour-location]");
        const locations = Array.from(tourLocationGroups).map((group)=>{
            return {
                type: "Point",
                coordinates: [
                    group.querySelector('input[name^="pos-"]').value,
                    group.querySelector('input[name^="lat-"]').value
                ],
                description: group.querySelector('input[name^="desciption-"]').value,
                day: group.querySelector('input[name^="days-"]').value
            };
        });
        // Send the API adress PATCH
        (0, $8bc100f925d8cfe6$export$f558026a994b6051)({
            id: id,
            name: name,
            slug: slug,
            duration: duration,
            difficulty: difficulty,
            price: price,
            maxGroupSize: maxGroupSize,
            imageCover: imageCover,
            summary: summary,
            description: description,
            images: images,
            guides: guides,
            startDates: startDates,
            startLocation: startLocation,
            locations: locations
        }, "tour");
    });
}); // Dom Ready Event listner
const $b6f4712e4c6c8e18$var$allUserSaveForm = document.querySelectorAll(".card-management-user");
if ($b6f4712e4c6c8e18$var$saveUserEdit) $b6f4712e4c6c8e18$var$allUserSaveForm.forEach((btn)=>{
    btn.addEventListener("submit", (e)=>{
        e.preventDefault();
        const id = btn.id;
        const name = btn.querySelector('input[name^="name-"]').value;
        const email = btn.querySelector('input[name^="email-"]').value;
        const role = btn.querySelector('select[name^="role-"]').value;
        (0, $8bc100f925d8cfe6$export$f558026a994b6051)({
            id: id,
            name: name,
            email: email,
            role: role
        }, "userEdit");
    });
});


//# sourceMappingURL=bundle.js.map
