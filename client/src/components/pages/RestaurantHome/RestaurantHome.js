import React from 'react';
import {
	Route,
	Switch,
} from 'react-router-dom';
import Restaurants from '../Restaurants';
import Restaurant from '../Restaurant';
class RestaurantHome extends React.PureComponent {

	render() {
		return (
			<section className="container-fluid">
        <Switch>
	          <Route exact path="/restaurants/search/:placeId" component={Restaurants} />
	          <Route exact path="/restaurants/:placeId" component={Restaurant} />
        </Switch>
      </section>
		);
	}
}

export default RestaurantHome;