const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const fetchRequest = require('../helpers/axiosIntance');

const postData = async (req, res) => {
    try {
        const csvFilePath = path.join(__dirname, '..', 'uploads', req.file.filename);

        const formData = new FormData();
        formData.append('csv_file', fs.createReadStream(csvFilePath));

        const response = await fetchRequest('/api_fe/post_data', 'POST', formData, {
            'Content-Type': 'multipart/form-data'
        });

        res.status(200).json({
            success: true,
            message: 'File uploaded and processed successfully',
            data: response.data
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'File upload failed',
            error: err.message
        });
    }
};

module.exports = {
    postData
};
