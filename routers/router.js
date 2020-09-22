'use strict';

module.exports = function(){
    return {
        setRouting: function(router){
            router.get('/', this.Main);
            router.get('*', this.Error);
        },

        Main: (req, res) => {
            res.render('index/Home.ejs', { 
                title: 'Bike Theft',
                canonical: ''
            });
        },

        Error: (req, res) => {
            res.render('index/Error.ejs', { 
                title: 'Bike Theft | 404 Error',
                canonical: ''
            });
        }
    }
};
