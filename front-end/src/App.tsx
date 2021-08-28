import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from "./components/Header/Header";
import NavBar from './components/NavBar/NavBar';
import routes from './routes';

function App() {
  const showContentRoutes = (routes: Array<{exact: boolean, path: string, main: any}>) => {
    let results: any;
    if(routes.length > 0) {
      results = routes.map((route, index) => {
        return <Route key={index} exact={route.exact} path={route.path} component={route.main()} />
      });
    }
    return results;
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <NavBar />
        <Switch>
          {showContentRoutes(routes)}
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
