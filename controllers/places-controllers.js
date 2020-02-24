const HttpError =  require('../models/http-error')

const DUMMY_PLACES = [
    {
        id: 'p3',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
        address: '20 W 34th St, New York, NY 10001',
        location: {
          lat: 40.7484405,
          lng: -73.9878584
        },
        creator: 'u1'
      },
      {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
        address: '20 W 34th St, New York, NY 10001',
        location: {
          lat: 40.7484405,
          lng: -73.9878584
        },
        creator: 'u1'
      },
      {
        id: 'p2',
        title: 'Victoria Memorial',
        description: 'The Victoria Memorial is a large marble building in Kolkata, West Bengal, India, which was built between 1906 and 1921. It is dedicated to the memory of Queen Victoria (1819–1901) and is now a museum and tourist destination under the auspices of the Ministry of Culture.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Victoria_Memorial_situated_in_Kolkata.jpg',
        address: 'Maidan, Kolkata, West Bengal 700071',
        location: {
          lat: 22.5447396,
          lng: 88.3434396
        },
        creator: 'u2'
      }
]

const getPlaceByUserId=(req,res,next)=>{

    const uid = req.params.uid;
    const places = DUMMY_PLACES.filter(value=>{
        return value.creator === uid;
    })

    if(places.length === 0){
        // const error = new Error(`Could not find any place with user id: ${uid}`);
        // error.code = 404;
        throw new HttpError(`Could not find any place with user id: ${uid}`, 404);
    }

    res.json(places)

}

const getPlaceById=(req, res, next)=>{
        
    const placeId = req.params.pid;
    const place = DUMMY_PLACES.find(place=>{
        return place.id === placeId
    })

    if(!place){
        // const error = new Error(`Could not find place with id: ${placeId}`);
        // error.code = 404;
        return next(new HttpError(`Could not find place with id: ${placeId}`, 404));
    }

    res.json({place})
}

const createNewPlace=(req, res, next)=>{
    const { title, description, address, location, creator } = req.body;

    const place = {
        title,
        description,
        address,
        location,
        creator
    }
    place.id = "p"+(DUMMY_PLACES.length+1);

    DUMMY_PLACES.push(place);

    res.status(201).json({place})
}

module.exports = {
    getPlaceById,
    getPlaceByUserId,
    createNewPlace
}