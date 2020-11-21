import React from 'react';
import Results from "./Results";
import { render, unmountComponentAtNode } from "react-dom";
import renderer from 'react-test-renderer';
import Router from "../../Router/Router";
import MainForm from "../CinemaMainForm";
import Result from "./Result/Result";
import SAMPLE_ARRAY from "../../../sampledata";

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

const cinemas = SAMPLE_ARRAY;

test('Results render correctly', () => {
    const loading = false;
    const favorites = [1];
    const tree = renderer.create(
        <Router>
            <MainForm loading={loading}>
            </MainForm>
        </Router>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

for (let i = 0; i < cinemas.length; i++) {
    test(`cinemas[${i}] should have properties id, name, region, postcode, city`, () => {
        expect(cinemas[i]).toHaveProperty("id");
        expect(cinemas[i]).toHaveProperty("name");
        expect(cinemas[i]).toHaveProperty("region");
        expect(cinemas[i]).toHaveProperty("postcode");
        expect(cinemas[i]).toHaveProperty("city");
    })
}

test("Spying using original implementation", () => {
    const cinema = {
        name: n => `Cinema name: ${n}`,
    };
    const spy = jest.spyOn(cinema, "name");
    expect(cinema.name("Open-Air-Schanzenkino")).toBe("Cinema name: Open-Air-Schanzenkino");
    expect(spy).toHaveBeenCalledWith("Open-Air-Schanzenkino");
})

test("Cinemas return Biesdorfer Parkbühne last", () => {
    const cinema1 = cinemas[0];
    const cinema2 = cinemas[1];
    const cinema3 = cinemas[2];

    const cinema = jest.fn(currentCinema => currentCinema.name);
    cinema(cinema1);
    cinema(cinema2);
    cinema(cinema3);

    expect(cinema).toHaveLastReturnedWith("Biesdorfer Parkbühne");
})

test("Cinema data has Freiluftkino Insel and matches as an object", () => {
    const testCinema = {
        id: "3",
        name: "Freiluftkino Insel",
        region: "Berlin",
        postcode: 10247,
        city: "Berlin",
        street: "Revaler Str. 99",
        pic: "https://i.postimg.cc/C1MpTztL/cinema-442977-640.jpg",
    }
    expect(cinemas[3]).toMatchObject(testCinema);
})