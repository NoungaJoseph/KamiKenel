const Puppy = require('../models/Puppy');
const cloudinary = require('../config/cloudinary');

// Helper function to upload image to Cloudinary
const uploadToCloudinary = async (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: 'kamikennels/puppies',
                resource_type: 'auto'
            },
            (error, result) => {
                if (error) reject(error);
                else resolve(result.secure_url);
            }
        );
        uploadStream.end(fileBuffer);
    });
};

// @desc    Get all puppies
// @route   GET /api/puppies
// @access  Public
exports.getAllPuppies = async (req, res) => {
    try {
        const puppies = await Puppy.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: puppies.length,
            data: puppies
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Get single puppy
// @route   GET /api/puppies/:id
// @access  Public
exports.getPuppy = async (req, res) => {
    try {
        const puppy = await Puppy.findById(req.params.id);

        if (!puppy) {
            return res.status(404).json({
                success: false,
                message: 'Puppy not found'
            });
        }

        res.status(200).json({
            success: true,
            data: puppy
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Create new puppy
// @route   POST /api/puppies
// @access  Protected
exports.createPuppy = async (req, res) => {
    try {
        const { name, gender, age, price, status, description, fatherName, fatherDescription, motherName, motherDescription } = req.body;

        // Upload images to Cloudinary if provided
        let imageUrls = [];
        let fatherImageUrl = '';
        let motherImageUrl = '';

        if (req.files) {
            // Handle puppy images
            const puppyImages = req.files.filter(f => f.fieldname === 'images');
            if (puppyImages.length > 0) {
                const uploadPromises = puppyImages.map(file => uploadToCloudinary(file.buffer));
                imageUrls = await Promise.all(uploadPromises);
            }

            // Handle father image
            const fatherImage = req.files.find(f => f.fieldname === 'fatherImage');
            if (fatherImage) {
                fatherImageUrl = await uploadToCloudinary(fatherImage.buffer);
            }

            // Handle mother image
            const motherImage = req.files.find(f => f.fieldname === 'motherImage');
            if (motherImage) {
                motherImageUrl = await uploadToCloudinary(motherImage.buffer);
            }
        }

        // Create puppy
        const puppy = await Puppy.create({
            name,
            gender,
            age,
            price,
            status: status || 'Available',
            description,
            images: imageUrls,
            father: fatherName ? {
                name: fatherName,
                image: fatherImageUrl,
                description: fatherDescription
            } : undefined,
            mother: motherName ? {
                name: motherName,
                image: motherImageUrl,
                description: motherDescription
            } : undefined
        });

        res.status(201).json({
            success: true,
            data: puppy
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Update puppy
// @route   PUT /api/puppies/:id
// @access  Protected
exports.updatePuppy = async (req, res) => {
    try {
        let puppy = await Puppy.findById(req.params.id);

        if (!puppy) {
            return res.status(404).json({
                success: false,
                message: 'Puppy not found'
            });
        }

        // Upload new images if provided
        let imageUrls = puppy.images;
        if (req.files && req.files.length > 0) {
            const uploadPromises = req.files.map(file => uploadToCloudinary(file.buffer));
            const newImageUrls = await Promise.all(uploadPromises);
            imageUrls = [...imageUrls, ...newImageUrls];
        }

        // Update puppy
        const updateData = {
            ...req.body,
            images: imageUrls
        };

        if (req.body.father) updateData.father = JSON.parse(req.body.father);
        if (req.body.mother) updateData.mother = JSON.parse(req.body.mother);

        puppy = await Puppy.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: puppy
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Delete puppy
// @route   DELETE /api/puppies/:id
// @access  Protected
exports.deletePuppy = async (req, res) => {
    try {
        const puppy = await Puppy.findById(req.params.id);

        if (!puppy) {
            return res.status(404).json({
                success: false,
                message: 'Puppy not found'
            });
        }

        await puppy.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Puppy deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};
