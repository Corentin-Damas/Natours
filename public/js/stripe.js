import { showAlert } from "./alerts";
const stripe = Stripe(
  "pk_test_51PciSXDPLnxXe12TOZlaUOf7S7DCVxkxI9WMXiGuf4xj6kACY4dhPVqIvE68iZxChKETUoo5QEP85MNqeAcq6rAW00Y3BvZt8t"
);

export const bookTour = async (tourId) => {
  try {
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    showAlert("error", err);
  }
};
