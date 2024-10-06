const fetchRequest = require('../helpers/axiosIntance');

const getEmployees = async (req, res) => {

    try {
        const response = await fetchRequest('/api_fe/list_employee', 'GET');
        const data = response.data;
        res.status(200).json(data);
    } catch (err) {
        console.log(err);

        res.status(500).json({ success: false, message: 'Failed to fetch data', error: err.message });
    }

};

module.exports = { getEmployees };
