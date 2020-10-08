import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import App from './App';
import { act } from "react-dom/test-utils";
import Router from "./Components/Router/Router"
import Results from "./Components/CinemaMainForm/Results/Results";
import Result from "./Components/CinemaMainForm/Results/Result/Result";
import renderer from 'react-test-renderer';
import CinemaProfile from "./Components/CinemaMainForm/Results/CinemaProfile/CinemaProfile"

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("Renders cinema data", async () => {
  const fakeCinema = [{
    id: "34",
    name: "Open-Air-Test",
    region: "Hamburg",
    postcode: 21336,
    city: "Hamburg",
    street: "Teststraße 1A",
    pic: "https://i.postimg.cc/zvcsTqLQ/kino2.jpg"
  }];

  jest.spyOn(global, "fetch").mockImplementation(() => {
    const fetchResponse = {
      json: () => Promise.resolve(fakeCinema)
    };
    return Promise.resolve(fetchResponse);
  });

  await act(async () => {
    render(<Router><Results cinemas={fakeCinema} selectedCinema={fakeCinema}/></Router>, container);
  });
  expect(container.textContent).toContain(fakeCinema[0].name);
  expect(container.textContent).toContain(fakeCinema[0].street);

  await act(async () => {
    render(<Router><Result cinemaDetails={fakeCinema} selectedCinema={fakeCinema}/></Router>, container);
  });
  expect(container.textContent).toContain(fakeCinema[0].name);
  expect(container.textContent).toContain(fakeCinema[0].region);
  expect(container.textContent).toContain(fakeCinema[0].city);

  await act(async () => {
    render(<CinemaProfile cinemaDetails={fakeCinema[0]}/>, container);
  });
  expect(container.textContent).toContain(fakeCinema[0].name);
  expect(container.textContent).toContain(fakeCinema[0].postcode);
  expect(container.textContent).toContain(fakeCinema[0].street);
  global.fetch.mockRestore();
})

test('App renders correctly', () => {
  const tree = renderer.create(
    <Router><App /></Router>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

