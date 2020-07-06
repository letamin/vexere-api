const { Station } = require("../../../../models/Station");

//middleware
const getStations = (req, res, next) => {
    Station.find()
        .then(stations => {
            res.status(200).json(stations); //status OK
        })
        .catch(err => res.json(err))
}

const getStationById = (req, res, next) => {
    const { id } = req.params;
    Station.findById(id)
        .then(station => {
            res.status(200).json(station);
        })
        .catch(err => res.json(err))
}

//replace
const putStationById = (req, res, next) => {
    const { id } = req.params;
    Station.findById(id)
        .then(station => {
            if (!station) return Promise.reject({
                status: 404,
                message: "Station not found"
            })

            // const { name, address, province } = req.body;
            // station.name = name;
            // station.address = address;
            // station.province = province;
            const keys = ["name", "address", "province"];
            keys.forEach(key => {
                station[key] = req.body[key];
            })
            return station.save();
        })
        .then(station => res.status(200).json(station))
        .catch(err => res.json(err))
}

//update
const patchStationById = (req, res, next) => {
    const { id } = req.params;
    Station.findById(id)
        .then(station => {
            if (!station) return Promise.reject({
                status: 404,
                message: "Station not found"
            })

            // const { name, address, province } = req.body;
            // if (name != undefined) station.name = name;
            // if (address != undefined) station.address = address;
            // if (province != undefined) station.province = province;

            Object.keys(req.body).forEach(key => {
                station[key] = req.body[key];
            })
            return station.save();
        })
        .then(station => res.status(200).json(station))
        .catch(err => res.json(err))
}

//delete
const deleteStationById = (req, res, next) => {
    const { id } = req.params;
    Station.findById(id)
        .then(station => {
            if (!station) return Promise.reject({
                status: 404,
                message: "Station not found"
            })

            return Promise.all([
                Station.deleteOne({ _id: id }),
                station
            ])
        })
        .then(result => res.status(200).json(result[1])) //result[0] la response cua Station.deleteOne({ _id: id }), result[1] la bien station
        .catch(err => res.json(err))
}

//create
const postStations = (req, res, next) => {
    const { name, address, province } = req.body;

    const newStation = new Station({ name, address, province });
    newStation.save()
        .then(station => {
            res.status(201).json(station); //status Created
        })
        .catch(err => res.json(err))
}

module.exports = {
    getStations,
    postStations,
    getStationById,
    putStationById,
    patchStationById,
    deleteStationById
}