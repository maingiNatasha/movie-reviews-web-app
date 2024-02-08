import MoviesDAO from "../dao/moviesDAO.js";

export default class MoviesController {
    static async apiGetMovies(request, response, next) {
        const moviesPerPage = request.query.moviesPerPage ? parseInt(request.query.moviesPerPage) : 20;
        const page = request.query.page ? parseInt(request.query.page) : 0;

        let filters = {};
        if (request.query.rated) {
            filters.rated = request.query.rated;
        }
        else if (request.query.title) {
            filters.title = request.query.title;
        }

        const { moviesList, totalNumMovies } = await MoviesDAO.getMovies({filters, page, moviesPerPage});
        let res = {
            movies: moviesList,
            page: page,
            filters: filters,
            entries_per_page: moviesPerPage,
            total_results: totalNumMovies
        }
        response.json(res);
    }

    static async apiGetMovieById(request, response, next) {
        try {
            let id = request.params.id || {};
            let movie = await MoviesDAO.getMovieById(id);

            if (!movie) {
                response.status(404).json({ error: 'Movie not found' });
                return;
            }

            response.json(movie);
        }
        catch (error) {
            console.log(`Unable to retrieve movie: ${error.message}`);
            response.status(500).json({ error: error.message });
        }
    }

    static async apiGetRatings(request, response, next) {
        try {
            let propertyTypes = await MoviesDAO.getRatings();
            response.json(propertyTypes);
        }
        catch (error) {
            console.log(`Unable to retrieve ratings: ${error.message}`);
            response.status(500).json({ error: error.message });
        }
    }
}