import React, {
  useEffect,
  useState
} from "react";

import API from "../api";

import Navbar from "../components/Navbar";

function ProfilePage() {

  const [profile,
    setProfile] =
    useState({

      name: "",
      email: "",
      phoneNumber: ""
    });

  const [passwords,
    setPasswords] =
    useState({

      oldPassword: "",
      newPassword: ""
    });

  const [loading,
    setLoading] =
    useState(false);

  // LOAD PROFILE
  useEffect(() => {

    fetchProfile();

  }, []);

  const fetchProfile =
    async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const res =
        await API.get(
          "/users/profile",
          {
            headers: {
              Authorization:
                "Bearer " + token
            }
          }
        );

      setProfile({

        name:
          res.data.name || "",

        email:
          res.data.email || "",

        phoneNumber:
          res.data.phoneNumber || ""
      });

    } catch (error) {

      console.log(error);
    }
  };

  // UPDATE PROFILE
  const updateProfile =
    async () => {

    try {

      setLoading(true);

      const token =
        localStorage.getItem(
          "token"
        );

      await API.put(

        "/users/profile",

        profile,

        {
          headers: {
            Authorization:
              "Bearer " + token
          }
        }
      );

      alert(
        "Profile Updated Successfully"
      );

    } catch (error) {

      console.log(error);

      alert(
        "Profile Update Failed"
      );

    } finally {

      setLoading(false);
    }
  };

  // CHANGE PASSWORD
  const changePassword =
    async () => {

    try {

      setLoading(true);

      const token =
        localStorage.getItem(
          "token"
        );

      await API.put(

        "/users/change-password",

        passwords,

        {
          headers: {
            Authorization:
              "Bearer " + token
          }
        }
      );

      alert(
        "Password Changed Successfully"
      );

      setPasswords({

        oldPassword: "",
        newPassword: ""
      });

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data
        || "Password Change Failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div style={styles.page}>

      <Navbar />

      {/* TOP HERO */}
      <div style={styles.hero}>

        <div style={styles.avatar}>
          👤
        </div>

        <h1 style={styles.heroTitle}>
          My Profile
        </h1>

        <p style={styles.heroSub}>
          Manage your account details
          and security settings
        </p>

      </div>

      {/* MAIN */}
      <div style={styles.container}>

        {/* LEFT PROFILE */}
        <div style={styles.profileCard}>

          <div style={styles.cardHeader}>

            <h2>
              Personal Information
            </h2>

            <span style={styles.badge}>
              Active
            </span>

          </div>

          <div style={styles.inputGroup}>

            <label style={styles.label}>
              Full Name
            </label>

            <input
              type="text"
              value={profile.name}

              onChange={(e) =>
                setProfile({
                  ...profile,
                  name:
                    e.target.value
                })
              }

              style={styles.input}
            />

          </div>

          <div style={styles.inputGroup}>

            <label style={styles.label}>
              Email Address
            </label>

            <input
              type="email"
              value={profile.email}

              onChange={(e) =>
                setProfile({
                  ...profile,
                  email:
                    e.target.value
                })
              }

              style={styles.input}
            />

          </div>

          <div style={styles.inputGroup}>

            <label style={styles.label}>
              Phone Number
            </label>

            <input
              type="text"
              value={
                profile.phoneNumber
              }

              onChange={(e) =>
                setProfile({
                  ...profile,
                  phoneNumber:
                    e.target.value
                })
              }

              style={styles.input}
            />

          </div>

          <button
            style={styles.primaryBtn}
            onClick={
              updateProfile
            }
          >

            {
              loading
              ? "Updating..."
              : "Save Changes"
            }

          </button>

        </div>

        {/* RIGHT SECURITY */}
        <div style={styles.securityCard}>

          <div style={styles.cardHeader}>

            <h2>
              Security Settings
            </h2>

            <span style={styles.securityBadge}>
              Protected
            </span>

          </div>

          <div style={styles.securityBox}>

            🔒 Your account is secured
            with encrypted password
            protection.

          </div>

          <div style={styles.inputGroup}>

            <label style={styles.label}>
              Current Password
            </label>

            <input
              type="password"

              value={
                passwords.oldPassword
              }

              onChange={(e) =>
                setPasswords({
                  ...passwords,
                  oldPassword:
                    e.target.value
                })
              }

              style={styles.input}
            />

          </div>

          <div style={styles.inputGroup}>

            <label style={styles.label}>
              New Password
            </label>

            <input
              type="password"

              value={
                passwords.newPassword
              }

              onChange={(e) =>
                setPasswords({
                  ...passwords,
                  newPassword:
                    e.target.value
                })
              }

              style={styles.input}
            />

          </div>

          <button
            style={styles.passwordBtn}
            onClick={
              changePassword
            }
          >

            {
              loading
              ? "Updating..."
              : "Change Password"
            }

          </button>

        </div>

      </div>

    </div>
  );
}

export default ProfilePage;

// MODERN UI STYLES
const styles = {

  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(to bottom,#eff6ff,#f8fafc)"
  },

  hero: {
    padding: "60px 20px",
    textAlign: "center",
    background:
      "linear-gradient(135deg,#2563eb,#3b82f6)",
    color: "white",
    borderBottomLeftRadius: "40px",
    borderBottomRightRadius: "40px",
    boxShadow:
      "0 8px 30px rgba(37,99,235,0.25)"
  },

  avatar: {
    width: "110px",
    height: "110px",
    margin: "0 auto",
    borderRadius: "50%",
    background:
      "rgba(255,255,255,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "55px",
    backdropFilter:
      "blur(8px)"
  },

  heroTitle: {
    marginTop: "20px",
    fontSize: "42px",
    fontWeight: "800"
  },

  heroSub: {
    marginTop: "10px",
    fontSize: "17px",
    opacity: 0.9
  },

  container: {
    maxWidth: "1300px",
    margin: "-40px auto 0 auto",
    padding: "20px",
    display: "grid",
    gridTemplateColumns:
      "1fr 1fr",
    gap: "30px"
  },

  profileCard: {
    background: "white",
    padding: "35px",
    borderRadius: "30px",
    boxShadow:
      "0 12px 35px rgba(0,0,0,0.08)"
  },

  securityCard: {
    background: "white",
    padding: "35px",
    borderRadius: "30px",
    boxShadow:
      "0 12px 35px rgba(0,0,0,0.08)"
  },

  cardHeader: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginBottom: "25px"
  },

  badge: {
    background:
      "#dcfce7",
    color: "#16a34a",
    padding: "8px 14px",
    borderRadius: "12px",
    fontWeight: "700",
    fontSize: "13px"
  },

  securityBadge: {
    background:
      "#dbeafe",
    color: "#2563eb",
    padding: "8px 14px",
    borderRadius: "12px",
    fontWeight: "700",
    fontSize: "13px"
  },

  securityBox: {
    background:
      "#eff6ff",
    padding: "16px",
    borderRadius: "18px",
    marginBottom: "25px",
    color: "#1e40af",
    fontWeight: "600",
    lineHeight: "1.6"
  },

  inputGroup: {
    marginBottom: "22px"
  },

  label: {
    display: "block",
    marginBottom: "10px",
    color: "#334155",
    fontWeight: "700"
  },

  input: {
    width: "100%",
    padding: "17px",
    borderRadius: "16px",
    border:
      "1px solid #dbeafe",
    background: "#f8fafc",
    fontSize: "15px",
    outline: "none",
    transition: "0.3s"
  },

  primaryBtn: {
    width: "100%",
    padding: "17px",
    border: "none",
    borderRadius: "18px",
    background:
      "linear-gradient(135deg,#2563eb,#3b82f6)",
    color: "white",
    fontWeight: "800",
    fontSize: "16px",
    cursor: "pointer",
    boxShadow:
      "0 10px 25px rgba(37,99,235,0.25)"
  },

  passwordBtn: {
    width: "100%",
    padding: "17px",
    border: "none",
    borderRadius: "18px",
    background:
      "linear-gradient(135deg,#ef4444,#f87171)",
    color: "white",
    fontWeight: "800",
    fontSize: "16px",
    cursor: "pointer",
    boxShadow:
      "0 10px 25px rgba(239,68,68,0.25)"
  }
};