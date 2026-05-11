import React, {
  useEffect,
  useState
} from "react";

import API from "../api";

function AddressPage() {

  const [addresses,
    setAddresses] =
    useState([]);

  const [form,
    setForm] =
    useState({

      fullName: "",
      mobile: "",
      pincode: "",
      state: "",
      city: "",
      houseNo: "",
      area: "",
      landmark: "",
      type: "HOME"

    });

  // FETCH ADDRESSES
  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses =
    async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const res =
        await API.get(
          "/address",
          {
            headers: {
              Authorization:
                "Bearer " + token
            }
          }
        );

      setAddresses(
        res.data
      );

    } catch (error) {

      console.log(error);
    }
  };

  // INPUT CHANGE
  const handleChange =
    (e) => {

    setForm({

      ...form,

      [e.target.name]:
      e.target.value
    });
  };

  // SAVE ADDRESS
  const saveAddress =
    async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      await API.post(
        "/address",
        form,
        {
          headers: {
            Authorization:
              "Bearer " + token
          }
        }
      );

      alert(
        "Address Saved Successfully"
      );

      setForm({

        fullName: "",
        mobile: "",
        pincode: "",
        state: "",
        city: "",
        houseNo: "",
        area: "",
        landmark: "",
        type: "HOME"
      });

      fetchAddresses();

    } catch (error) {

      console.log(error);

      alert(
        "Failed To Save Address"
      );
    }
  };

  return (

    <div style={styles.page}>

      {/* HEADER */}
      <div style={styles.header}>

        <h1 style={styles.heading}>
          📍 Manage Addresses
        </h1>

        <p style={styles.subHeading}>
          Add and manage your delivery addresses
        </p>

      </div>

      <div style={styles.container}>

        {/* LEFT FORM */}
        <div style={styles.left}>

          <div style={styles.card}>

            <h2 style={styles.cardTitle}>
              Add New Address
            </h2>

            <div style={styles.grid}>

              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={form.fullName}
                onChange={handleChange}
                style={styles.input}
              />

              <input
                type="text"
                name="mobile"
                placeholder="Mobile Number"
                value={form.mobile}
                onChange={handleChange}
                style={styles.input}
              />

              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={form.pincode}
                onChange={handleChange}
                style={styles.input}
              />

              <input
                type="text"
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                style={styles.input}
              />

              <input
                type="text"
                name="state"
                placeholder="State"
                value={form.state}
                onChange={handleChange}
                style={styles.input}
              />

              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                style={styles.input}
              >

                <option value="HOME">
                  Home
                </option>

                <option value="WORK">
                  Work
                </option>

              </select>

            </div>

            <textarea
              name="houseNo"
              placeholder="House No / Flat / Building"
              value={form.houseNo}
              onChange={handleChange}
              style={styles.textarea}
            />

            <textarea
              name="area"
              placeholder="Area / Street / Colony"
              value={form.area}
              onChange={handleChange}
              style={styles.textarea}
            />

            <textarea
              name="landmark"
              placeholder="Landmark"
              value={form.landmark}
              onChange={handleChange}
              style={styles.textarea}
            />

            <button
              style={styles.button}
              onClick={saveAddress}
            >
              Save Address
            </button>

          </div>

        </div>

        {/* RIGHT ADDRESS LIST */}
        <div style={styles.right}>

          <h2 style={styles.savedTitle}>
            Saved Addresses
          </h2>

          {
            addresses.length > 0
            ? (

              addresses.map((a) => (

                <div
                  key={a.id}
                  style={styles.addressCard}
                >

                  <div style={styles.badge}>
                    {a.type}
                  </div>

                  <h3 style={styles.name}>
                    {a.fullName}
                  </h3>

                  <p style={styles.mobile}>
                    📞 {a.mobile}
                  </p>

                  <p style={styles.address}>
                    {a.houseNo},
                    {" "}
                    {a.area},
                    {" "}
                    {a.city},
                    {" "}
                    {a.state}
                  </p>

                  <p style={styles.address}>
                    PIN:
                    {" "}
                    {a.pincode}
                  </p>

                  <p style={styles.landmark}>
                    📍 {a.landmark}
                  </p>

                </div>
              ))

            ) : (

              <div style={styles.emptyBox}>

                <h3>
                  No Address Found
                </h3>

                <p>
                  Add your first address
                </p>

              </div>
            )
          }

        </div>

      </div>

    </div>
  );
}

export default AddressPage;

// STYLES
const styles = {

  page: {
    background: "#f1f3f6",
    minHeight: "100vh",
    padding: "30px"
  },

  header: {
    marginBottom: "30px"
  },

  heading: {
    fontSize: "38px",
    fontWeight: "700"
  },

  subHeading: {
    color: "#666",
    marginTop: "10px"
  },

  container: {
    display: "flex",
    gap: "25px"
  },

  left: {
    flex: 2
  },

  right: {
    flex: 1
  },

  card: {
    background: "white",
    padding: "30px",
    borderRadius: "20px",
    boxShadow:
      "0 4px 15px rgba(0,0,0,0.08)"
  },

  cardTitle: {
    marginBottom: "25px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(2, 1fr)",
    gap: "15px"
  },

  input: {
    padding: "14px",
    borderRadius: "10px",
    border:
      "1px solid #ddd",
    outline: "none",
    fontSize: "15px"
  },

  textarea: {
    width: "100%",
    marginTop: "15px",
    padding: "14px",
    borderRadius: "10px",
    border:
      "1px solid #ddd",
    minHeight: "90px",
    resize: "vertical",
    fontSize: "15px"
  },

  button: {
    width: "100%",
    padding: "16px",
    marginTop: "20px",
    border: "none",
    borderRadius: "12px",
    background: "#2874f0",
    color: "white",
    fontSize: "17px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow:
      "0 5px 15px rgba(40,116,240,0.3)"
  },

  savedTitle: {
    marginBottom: "20px"
  },

  addressCard: {
    background: "white",
    padding: "22px",
    borderRadius: "18px",
    marginBottom: "20px",
    boxShadow:
      "0 4px 15px rgba(0,0,0,0.08)",
    position: "relative"
  },

  badge: {
    position: "absolute",
    top: "20px",
    right: "20px",
    background: "#2874f0",
    color: "white",
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600"
  },

  name: {
    marginBottom: "10px"
  },

  mobile: {
    color: "#444",
    marginBottom: "10px"
  },

  address: {
    color: "#555",
    lineHeight: "1.6"
  },

  landmark: {
    marginTop: "10px",
    color: "#16a34a",
    fontWeight: "600"
  },

  emptyBox: {
    background: "white",
    padding: "40px",
    borderRadius: "20px",
    textAlign: "center",
    color: "#666"
  }
};