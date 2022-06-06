import React from "react";
import "./LandModall.css";
import thumbnail from "../Assets/images/thumbnail.png";
import logo from "./logo.png";
import Oceans from '../Assets/Oceans.jpg'

function Modall({ setOpenModal1 }) {
  return (
    <div className="modalBackground1">
      <div className="modalContainer1">
        <div className="titleCloseBtn1">
          <button
            style={{ color: "white" }}
            onClick={() => {
              setOpenModal1(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="black"
              class="bi bi-x-circle"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </button>
        </div>
        <div className="row">
          <div className="col-12">
            <h2 id="c1">VERONICA WANG</h2>
          </div>
        </div>
        <div className="col-12 text-start" id="modelDiv">
        <h4 className="pt-2" id="modelColor">MY STORY</h4>
          <p>
            Veronica is a self-taught artist wax based in Austin, Texas but
            moved to Vegas. She never attended art school, but her unique art
            form had allow her to show case in Exhibitions in New York, Chicago,
            Texas and Vegas. One of her pieces entitled "Courage Strength and
            Forgiven." Was chosen and display at Texas Capitol Hill by Rep John
            Bucy III As Artist of the Month in March 2019, in conjunction with
            International Women's days and Women's History month. She has her
            art published in international Literary Magazine "Beyond Words",
            March issue 2020. And now currently exhibiting online with
            Baifarin.com in Toronto Canada "Femina" 2022 in conjunction of
            international woman's day.
          </p>
          <h4 className="pt-2" id="modelColor">MY ART WORK</h4>
          <p>
          Being a mixed media orlist, Veronica often uses different technique to express her ideas She explores details of lines and dots using a combination of various media. The lines and dots are repeated to create unique flowers, foliage, corals and living creatures that all come together to invoke all five senses that connect us with the colorful, vibrant, and complex world we all live in. She uses this technique simply not to paint a landscape or seascape but to describe the enormity of the beauty and the harmony that exists between us and the world that surrounds us. She draws inspiration from her life experiences in the countries she lived in: Australia, Israel, Canada, New Zealand, Denmark, and Austin. The vast array of designs, culture, colors, and the stories behind them had greatly influence on what and how she paints. Her medium of choices is a mixture of acrylic, watercolor gouache and posca pens. Sometimes she also explores with alcohol ink, resin, textile liner, grog metal paint, art clay and even shoe polish and eggshells to add more depth and emotions to her art form.
          </p>
        </div>
        <div className="row">
          <div className="col-12">
            <button className="h4" id="modelButton">BUY NFT</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modall;
