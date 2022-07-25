/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51LOybiFs7r59FF3LTcHzUaTvxcRdbiFAF50QAoPXIOrTU5mKx6KwLI8wVDk27kiT1xn28NccgYI72s2WmF4Lcz0E00T5hgr1GV'
);

export const bookTour = async tourID => {
  try {
    // 1) Get checkout sesssion from API.
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/booking/checkout-session/${tourID}`
    );

    // 2) Create checkout form + charage credit card.
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    showAlert('error', err);
  }
};
