import { Company } from "../models/company.model.js";

// Register a Company
export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;

        // Validate input
        if (!companyName) {
            return res.status(400).json({
                message: "Company Name is required",
                success: false,
            });
        }

        // Check if company already exists
        const existingCompany = await Company.findOne({ name: companyName });
        if (existingCompany) {
            return res.status(400).json({
                message: "Company already exists",
                success: false,
            });
        }

        // Create new company
        const company = await Company.create({
            name: companyName,
            userId: req.id, // Assuming req.id is the authenticated user's ID
        });

        return res.status(201).json({
            message: "Company registered successfully",
            success: true,
            company,
        });

    } catch (error) {
        console.error("Error in registerCompany:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};

// Get Companies by User ID
export const getCompany = async (req, res) => {
    try {
        const userId = req.id; // Assuming req.id is the authenticated user's ID
        const companies = await Company.find({ userId });

        if (companies.length === 0) {
            return res.status(404).json({
                message: "No companies found for this user",
                success: false,
            });
        }

        return res.status(200).json({
            success: true,
            companies,
        });

    } catch (error) {
        console.error("Error in getCompany:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};

// Get Company by ID
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;

        // Validate companyId
        if (!companyId) {
            return res.status(400).json({
                message: "Company ID is required",
                success: false,
            });
        }

        const company = await Company.findById(companyId);

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false,
            });
        }

        return res.status(200).json({
            success: true,
            company,
        });

    } catch (error) {
        console.error("Error in getCompanyById:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};

// Update Company
export const updateCompany = async (req, res) => {
    try {
        const companyId = req.params.id;
        const { name, description, website, location } = req.body;
        const file = req.file; // If handling file uploads (e.g., for company logo)

        // Validate companyId
        if (!companyId) {
            return res.status(400).json({
                message: "Company ID is required",
                success: false,
            });
        }

        // Validate input
        if (!name && !description && !website && !location && !file) {
            return res.status(400).json({
                message: "At least one field is required to update the company",
                success: false,
            });
        }

        // Prepare update data
        const updateData = {};
        if (name) updateData.name = name;
        if (description) updateData.description = description;
        if (website) updateData.website = website;
        if (location) updateData.location = location;
        if (file) {
            // Handle file upload (e.g., upload to Cloudinary and save the URL)
            // updateData.logo = fileUrl;
        }

        // Find and update the company
        const company = await Company.findByIdAndUpdate(companyId, updateData, { new: true });

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Company updated successfully",
            success: true,
            company,
        });

    } catch (error) {
        console.error("Error in updateCompany:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};