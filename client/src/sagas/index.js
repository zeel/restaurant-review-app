import userSaga from './user';
import reviewSaga from './review';

export default function* sagas() {
	yield [reviewSaga, userSaga];
}