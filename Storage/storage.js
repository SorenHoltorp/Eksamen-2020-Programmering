var storageFiles = JSON.parse(localStorage.getItem("storageFiles")) || {},
    elephant = document.getElementById("elephant"),
    storageFilesDate = storageFiles.date,
    date = new Date(),
    todaysDate = (date.getMonth() + 1).toString() + date.getDate().toString();

// Compare date and create localStorage if it's not existing/too old   
if (typeof storageFilesDate === "undefined" || storageFilesDate < todaysDate) {
    // Take action when the image has loaded
    elephant.addEventListener("load", function () {
        var imgCanvas = document.createElement("canvas"),
            imgContext = imgCanvas.getContext("2d");

        // Make sure canvas is as big as the picture
        imgCanvas.width = elephant.width;
        imgCanvas.height = elephant.height;

        // Draw image into canvas element
        imgContext.drawImage(elephant, 0, 0, elephant.width, elephant.height);

        // Save image as a data URL
        storageFiles.elephant = imgCanvas.toDataURL("image/png");

        // Set date for localStorage
        storageFiles.date = todaysDate;

        // Save as JSON in localStorage
        try {
            localStorage.setItem("storageFiles", JSON.stringify(storageFiles));
        }
        catch (e) {
            console.log("Storage failed: " + e);
        }
    }, false);

    // Set initial image src    
    elephant.setAttribute("src", "elephant.png");
}
else {
    // Use image from localStorage
    elephant.setAttribute("src", storageFiles.elephant);
}
