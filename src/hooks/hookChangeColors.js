import { dtheme } from "../styles/DaylineTheme";

const useColors = ({ currentHours }) => {
    let mainColor;
    let secondColor;
    let thirdColor;

    if (currentHours === 0 || currentHours === 1 || currentHours === 2 || currentHours === 3 || currentHours === 4) {
        mainColor = dtheme.dayMode.colors04.main;
        secondColor = dtheme.dayMode.colors04.second;
        thirdColor = dtheme.dayMode.colors04.third;
    } else if (currentHours === 5 || currentHours === 6 || currentHours === 7 || currentHours === 8) {
        mainColor = dtheme.dayMode.colors48.main;
        secondColor = dtheme.dayMode.colors48.second;
        thirdColor = dtheme.dayMode.colors48.third;
    } else if (currentHours === 9 || currentHours === 10 || currentHours === 11 || currentHours === 12) {
        mainColor = dtheme.dayMode.colors812.main;
        secondColor = dtheme.dayMode.colors812.second;
        thirdColor = dtheme.dayMode.colors812.third;
    } else if (currentHours === 13 || currentHours === 14 || currentHours === 15 || currentHours === 16) {
        mainColor = dtheme.dayMode.colors1216.main;
        secondColor = dtheme.dayMode.colors1216.second;
        thirdColor = dtheme.dayMode.colors1216.third;
    } else if (currentHours === 17 || currentHours === 18 || currentHours === 19 || currentHours === 20) {
        mainColor = dtheme.dayMode.colors1620.main;
        secondColor = dtheme.dayMode.colors1620.second;
        thirdColor = dtheme.dayMode.colors1620.third;
    } else if (currentHours === 21 || currentHours === 22 || currentHours === 23) {
        mainColor = dtheme.dayMode.colors2024.main;
        secondColor = dtheme.dayMode.colors2024.second;
        thirdColor = dtheme.dayMode.colors2024.third;
    }

    return [mainColor, secondColor, thirdColor];
}

export { useColors };