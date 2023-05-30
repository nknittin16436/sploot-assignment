import app from './app';
import 'dotenv/config';
import connectToDb from './db/connection';

connectToDb().then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Listening to port ${process.env.PORT}`);
    });
});
