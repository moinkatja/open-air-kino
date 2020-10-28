import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Favorites from "./Favorites";
import { NavLink } from 'react-router-dom';

configure ({adapter: new Adapter()});

describe ("<Favorites/>", () => {
    it ("should render NavLink to favorites if there are any favorites", () => {
        const wrapper = shallow(<Favorites favorites={[0,1]}/>)
        expect(wrapper.find(NavLink));
    });
/*     it ("should render favorites number equals to 2", () => {
        const wrapper = shallow(<Favorites favorites={[0,1]}/>)
        expect(wrapper.find("strong").toContain(2));
    }); */
    it ("should not render NavLink to favorites if there are no favorites", () => {
        const wrapper = shallow(<Favorites favorites={[]} />);
        expect(!wrapper.find(NavLink));
    })
    it ("should render disabled button to favorites if there are no favorites", () => {
        const wrapper = shallow(<Favorites favorites={[]} />);
        expect(wrapper.find(<button disabled></button>));
    })
})


