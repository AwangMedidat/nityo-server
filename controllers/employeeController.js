const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { db_company } = require('../config/db');

const postEmployee = async (req, res) => {
    const { employeeName, employeeManagerId } = req.body;

    try {
        let result

        if (employeeName === '') {
            return res.status(400).json({ success: false, message: 'Employee Name is required' });
        } else if (employeeManagerId === '') {
            result = await db_company.query(
                'INSERT INTO tbl_employee_1 (employee_name, employee_manager_id, manager_name, path_level, employee_format, path_hierarchy) VALUES ($1, $2, $3, $4, $5, $6)',
                [employeeName, null, null, 0, employeeName, employeeName]
            );
        } else {
            const managerQuery = await db_company.query(
                'SELECT employee_id, employee_name, path_level FROM tbl_employee_1 WHERE employee_id = $1',
                [+employeeManagerId]
            );

            if (managerQuery.rowCount === 0) {
                return res.status(400).json({ success: false, message: 'Manager not found', data: {} });
            }

            const manager = managerQuery.rows[0];
            const managerId = manager.employee_id;
            const managerName = manager.employee_name;
            const managerPathLevel = manager.path_level;
            const newPathLevel = managerPathLevel + 1;
            let spaces = '';
            if (newPathLevel > 1) {
                spaces = ' '.repeat((newPathLevel - 1) * 3);
            }
            const employeeFormat = `${spaces}|__${employeeName}`;
            let arrHierarchy = [];
            let tempEmployeeManagerId = +employeeManagerId;

            while (tempEmployeeManagerId) {
                let dataTempmanager = await db_company.query(
                    'SELECT employee_manager_id, employee_name FROM tbl_employee_1 WHERE employee_id = $1',
                    [tempEmployeeManagerId]
                );

                if (dataTempmanager.rows.length === 0) break;

                let idManager = dataTempmanager.rows[0].employee_manager_id;
                let managerName = dataTempmanager.rows[0].employee_name;

                arrHierarchy.push(managerName);
                tempEmployeeManagerId = idManager;
            }

            arrHierarchy.reverse();
            arrHierarchy.push(employeeName);

            const pathHierarchy = arrHierarchy.join('->');

            console.log(arrHierarchy);
            

            // result = await db_company.query(
            //     'INSERT INTO tbl_employee (employee_name, employee_manager_id, manager_name, path_level, employee_format, path_hierarchy) VALUES ($1, $2, $3, $4, $5, $6)',
            //     [employeeName, managerId, managerName, newPathLevel, employeeFormat, pathHierarchy]
            // );
        }

        return res.status(201).json({ success: true, message: 'Succesfully submit employee' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Failed submit employee' });
    }
};


const getEpmloyees = async (req, res) => {

    try {
        const result = await db_company.query('SELECT * FROM tbl_employee');
        const data = result.rows;

        return res.status(201).json({ success: true, message: 'Employee data success showed', data });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Failed Get Data Employess', data: [] });
    }

};

module.exports = { postEmployee, getEpmloyees };
