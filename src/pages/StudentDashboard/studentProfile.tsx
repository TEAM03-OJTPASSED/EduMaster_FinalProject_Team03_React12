import React, { useState, useEffect } from "react";

const StudentProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [studentInfo, setStudentInfo] = useState({
        name: "Edu Master",
        email: "team03ojt@gmail.com",
        phone: "0123456789",
        avatar: "https://via.placeholder.com/150",
        coverPhoto: "https://via.placeholder.com/800x200",
        memberSince: "", 
    });

    useEffect(() => {
        const currentDate = new Date().toLocaleDateString(); 
        setStudentInfo((prevInfo) => ({ ...prevInfo, memberSince: currentDate }));
    }, []); 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setStudentInfo({ ...studentInfo, [name]: value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = e.target;
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setStudentInfo({ ...studentInfo, [name]: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        console.log("Saved student info:", studentInfo); 
        setIsEditing(false); 
    };

    return (
        <div style={styles.container}>
            <div style={styles.coverPhotoContainer}>
                <img src={studentInfo.coverPhoto} alt="Cover" style={styles.coverPhoto} />
            </div>
            <div style={styles.profileHeader}>
                <img
                    src={studentInfo.avatar}
                    alt="Student Avatar"
                    style={styles.avatar}
                />
                <div>
                    <h2 style={styles.name}>{studentInfo.name}</h2>
                </div>
            </div>
            <div style={styles.detailsSection}>
                <h3 style={styles.sectionTitle}>Profile Details</h3>
                <div style={styles.detailItem}>
                    <strong>Email:</strong> {studentInfo.email}
                </div>
                <div style={styles.detailItem}>
                    <strong>Phone:</strong> {studentInfo.phone}
                </div>
                <div style={styles.detailItem}>
                    <strong>Member since:</strong> {studentInfo.memberSince} {/* Hiển thị ngày tháng năm */}
                </div>
            </div>
            <div style={styles.editSection}>
                <button onClick={toggleEdit} style={styles.editButton}>
                    {isEditing ? "Cancel" : "Edit Profile"}
                </button>
                {isEditing && (
                    <form onSubmit={handleSubmit} style={styles.editForm as React.CSSProperties}>
                        <div>
                            <label>Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={studentInfo.name}
                                onChange={handleChange}
                                style={styles.input}
                            />
                        </div>
                        <div>
                            <label>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={studentInfo.email}
                                onChange={handleChange}
                                style={styles.input}
                            />
                        </div>
                        <div>
                            <label>Phone:</label>
                            <input
                                type="text"
                                name="phone"
                                value={studentInfo.phone}
                                onChange={handleChange}
                                style={styles.input}
                            />
                        </div>
                        <div>
                            <label>Avatar:</label>
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={styles.input}
                            />
                        </div>
                        <div>
                            <label>Cover Photo:</label>
                            <input
                                type="file"
                                name="coverPhoto"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={styles.input}
                            />
                        </div>
                        <button type="submit" style={styles.saveButton}>
                            Save Changes
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: "800px",
        margin: "20px auto",
        padding: "20px",
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        fontFamily: "'Arial', sans-serif",
    },
    coverPhotoContainer: {
        width: "100%",
        height: "200px",
        overflow: "hidden",
        borderRadius: "10px 10px 0 0",
    },
    coverPhoto: {
        width: "100%",
        height: "auto",
    },
    profileHeader: {
        display: "flex",
        alignItems: "center",
        borderBottom: "2px solid #ff782d",
        paddingBottom: "15px",
        marginBottom: "20px",
        marginTop: "-60px", 
    },
    avatar: {
        borderRadius: "50%",
        width: "120px",
        height: "120px",
        marginRight: "20px",
        border: "3px solid #ff782d",
        backgroundColor: "#ffffff",
    },
    name: {
        fontSize: "40px",
        fontWeight: "600",
        color: "#333",
        margin: 0,
        marginTop: "30px", 
    },
    detailsSection: {
        marginBottom: "20px",
    },
    sectionTitle: {
        fontSize: "22px",
        fontWeight: "500",
        color: "#ff782d",
        marginBottom: "10px",
    },
    detailItem: {
        fontSize: "16px",
        marginBottom: "5px",
        color: "#333",
    },
    editSection: {
        marginTop: "20px",
    },
    editButton: {
        padding: "10px 15px",
        backgroundColor: "#ff782d",
        color: "#ffffff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginBottom: "15px",
    },
    editForm: {
        display: "flex",
        flexDirection: "column",
    },
    input: {
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "5px",
        border: "1px solid #ddd",
    },
    saveButton: {
        padding: "10px",
        backgroundColor: "#28a745",
        color: "#ffffff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
};

export default StudentProfile;
