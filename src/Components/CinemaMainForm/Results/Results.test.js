import React from 'react';
import Results from "./Results";
import { render, unmountComponentAtNode } from "react-dom";
import renderer from 'react-test-renderer';
import Router from "../../Router/Router";
import MainForm from "../CinemaMainForm";
import Result from "./Result/Result";

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

test('Results render correctly', () => {
    const loading = false;
    const favorites = [1];
    const cinemas = [
        { "id": "0", "name": "Open-Air-Schanzenkino", "region": "Hamburg", "postcode": 20357, "city": "Hamburg", "street": "Sternschanze 1A", "pic": "https://i.postimg.cc/zvcsTqLQ/kino2.jpg" },
        { "id": "1", "name": "Open Air Kino in Dornumersiel", "region": "Niedersachsen", "postcode": 26553, "city": "Dornumersiel", "street": "Seeparkbühne", "pic": "https://i.postimg.cc/MTWJSP29/kino1.jpg" },
        { "id": "2", "name": "Biesdorfer Parkbühne", "region": "Berlin", "postcode": 12683, "city": "Berlin", "street": "Nordpromenade 5", "pic": "https://i.postimg.cc/j22VWDjN/kino3.jpg" },
    ]
    const tree = renderer.create(
        <Router>
            <MainForm loading={loading}>
            </MainForm>
        </Router>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});