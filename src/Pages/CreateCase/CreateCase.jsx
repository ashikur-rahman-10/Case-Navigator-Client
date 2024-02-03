import React, { useState, useEffect } from "react";
import casesData from "../../../public/cases.json";
import locationsData from "../../../public/locations.json";
import useAuth from "../../Hooks/useAuth";

const CreateCase = ({ userDisplayName }) => {
    const { user } = useAuth();
    const [driverName, setDriverName] = useState("");
    const [numberOfVehicles, setNumberOfVehicles] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [licenseNumber, setLicenseNumber] = useState("");
    const [vehicleType, setVehicleType] = useState("");
    const [selectedCases, setSelectedCases] = useState([]);
    const [shortDescription, setShortDescription] = useState("");
    const [totalFine, setTotalFine] = useState(0);
    const [selectedDivision, setSelectedDivision] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedUpazila, setSelectedUpazila] = useState("");
    const [roadName, setRoadName] = useState("");
    const [roadNumber, setRoadNumber] = useState("");

    useEffect(() => {
        calculateTotalFine();
    }, [selectedCases, vehicleType]);

    const handleVehicleTypeChange = (e) => {
        setVehicleType(e.target.value);
        setSelectedCases([]); // Reset selected cases when changing vehicle type
    };

    const handleCaseChange = (e) => {
        const selectedCaseLabel = e.target.value;
        setSelectedCases((prevSelectedCases) => {
            if (prevSelectedCases.includes(selectedCaseLabel)) {
                // If case is already selected, remove it
                return prevSelectedCases.filter(
                    (caseItem) => caseItem !== selectedCaseLabel
                );
            } else {
                // If case is not selected, add it
                return [...prevSelectedCases, selectedCaseLabel];
            }
        });
    };

    const calculateTotalFine = () => {
        let total = 0;
        selectedCases.forEach((caseLabel) => {
            const selectedCaseData = casesData[vehicleType].find(
                (item) => item.label === caseLabel
            );
            if (selectedCaseData) {
                total += selectedCaseData.fine;
            }
        });
        setTotalFine(total);
    };

    const handleDivisionChange = (e) => {
        const division = e.target.value;
        setSelectedDivision(division);
        setSelectedDistrict(""); // Reset district when changing division
        setSelectedUpazila(""); // Reset upazila when changing division
    };

    const handleDistrictChange = (e) => {
        setSelectedDistrict(e.target.value);
        setSelectedUpazila(""); // Reset upazila when changing district
    };

    const handleUpazilaChange = (e) => {
        setSelectedUpazila(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Get the current date and time
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString();

        // Create the case data object
        const caseData = {
            caseCreator: user.displayName,
            driverName,
            numberOfVehicles,
            phoneNumber,
            licenseNumber,
            vehicleType,
            selectedCases,
            shortDescription,
            totalFine,
            creationDate: formattedDate,
            location: {
                division: selectedDivision,
                district: selectedDistrict,
                upazila: selectedUpazila,
                roadName,
                roadNumber,
            },
        };

        console.log(caseData);

        // Use fetch to send a POST request to the specified URL
        fetch("https://case-navigator.vercel.app/cases", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(caseData),
        })
            .then((response) => {
                if (response.ok) {
                    // If the response is successful, you can handle the success accordingly
                    console.log("Case created successfully!");
                } else {
                    // If there's an error, handle it accordingly
                    console.error(
                        "Failed to create case. Status:",
                        response.status
                    );
                }
            })
            .catch((error) => {
                // Handle errors from the fetch operation
                console.error("Error:", error);
            });
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-8 bg-white rounded shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Create Traffic Case</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">
                        Driver Name:
                    </label>
                    <input
                        type="text"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        value={driverName}
                        onChange={(e) => setDriverName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">
                        Number of Vehicles:
                    </label>
                    <input
                        type="text"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        value={numberOfVehicles}
                        onChange={(e) => setNumberOfVehicles(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">
                        Phone Number:
                    </label>
                    <input
                        type="text"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">
                        License Number (if available):
                    </label>
                    <input
                        type="text"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        value={licenseNumber}
                        onChange={(e) => setLicenseNumber(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">
                        Select Vehicle Type:
                    </label>
                    <select
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        value={vehicleType}
                        onChange={handleVehicleTypeChange}
                    >
                        <option value="">Select Vehicle Type</option>
                        <option value="Bike">Bike</option>
                        <option value="Car">Car</option>
                        <option value="Bus">Bus</option>
                        <option value="Truck">Truck</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">
                        Select Case Type (Multiple):
                    </label>
                    <div className="flex flex-col gap-2 pt-2">
                        {vehicleType &&
                            casesData[vehicleType] &&
                            casesData[vehicleType].map((caseOption) => (
                                <label
                                    key={caseOption.label}
                                    className="flex  space-x-2"
                                >
                                    <input
                                        type="checkbox"
                                        value={caseOption.label}
                                        checked={selectedCases.includes(
                                            caseOption.label
                                        )}
                                        onChange={handleCaseChange}
                                        className="form-checkbox  h-5 w-5 text-blue-500"
                                    />
                                    <span>
                                        {caseOption.label} - Fine:{" "}
                                        {caseOption.fine} BDT
                                    </span>
                                </label>
                            ))}
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">
                        Short Description of the Case:
                    </label>
                    <textarea
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        value={shortDescription}
                        onChange={(e) => setShortDescription(e.target.value)}
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">
                        Location:
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600">
                                Division:
                            </label>
                            <select
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                value={selectedDivision}
                                onChange={handleDivisionChange}
                            >
                                <option value="">Select Division</option>
                                {locationsData.divisions.map((division) => (
                                    <option
                                        key={division.label}
                                        value={division.label}
                                    >
                                        {division.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">
                                District:
                            </label>
                            <select
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                value={selectedDistrict}
                                onChange={handleDistrictChange}
                                disabled={!selectedDivision}
                            >
                                <option value="">Select District</option>
                                {selectedDivision &&
                                    locationsData.divisions
                                        .find(
                                            (division) =>
                                                division.label ===
                                                selectedDivision
                                        )
                                        ?.districts.map((district) => (
                                            <option
                                                key={district.label}
                                                value={district.label}
                                            >
                                                {district.label}
                                            </option>
                                        ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">
                                Upazila:
                            </label>
                            <select
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                value={selectedUpazila}
                                onChange={handleUpazilaChange}
                                disabled={!selectedDistrict}
                            >
                                <option value="">Select Upazila</option>
                                {selectedDistrict &&
                                    locationsData.divisions
                                        .find(
                                            (division) =>
                                                division.label ===
                                                selectedDivision
                                        )
                                        ?.districts.find(
                                            (district) =>
                                                district.label ===
                                                selectedDistrict
                                        )
                                        ?.upazilas.map((upazila) => (
                                            <option
                                                key={upazila}
                                                value={upazila}
                                            >
                                                {upazila}
                                            </option>
                                        ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">
                        Road Name:
                    </label>
                    <input
                        type="text"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        value={roadName}
                        onChange={(e) => setRoadName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">
                        Road Number:
                    </label>
                    <input
                        type="text"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        value={roadNumber}
                        onChange={(e) => setRoadNumber(e.target.value)}
                    />
                </div>
                {totalFine > 0 && (
                    <div className="my-4 ">
                        <p className="text-lg font-bold">
                            Total Fine: {totalFine} BDT
                        </p>
                    </div>
                )}
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                    File This Case
                </button>
            </form>
        </div>
    );
};

export default CreateCase;
