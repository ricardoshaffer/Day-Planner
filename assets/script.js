$(document).ready(function() {
    $(".isdone").val();
    $("#todaysDate").text(moment().format('dddd'+ ", "+"MMM Do"));// setting today's date on the header.
    let currentHour = moment().format('H'); // currentHour used to get the time of day in 24 hours (vs. AM/PM)
        
    scheduleHour = $(".btn").closest('div.mb-3').attr('id');// pulls the closest ID of the ancestor of the 'save' button to associate to a time.
        
    let scheduleID= ("#input-"+scheduleHour);//sets the schedule ID for the textbox by appending the 'scheduleHour ID to the input ID
        
   //scheduledEvents = $(scheduleID).val(); // pulls the value of the scheduled item, which is now associated with the schedule Hour.

   // Function to listen for click on the 'save' button for the event.
    $(".btnSave").on("click", function(event) {
        event.preventDefault();
        scheduleHour = $(this).closest('div.mb-3').attr('id');
       let scheduleID= ("#input-"+scheduleHour);
       let todoItem = $(scheduleID).val(); // gets the value of the todo item
       // scheduledEvents = $(scheduleID).val();
        
        console.log("Selected Hour ID: " + scheduleID);
        console.log("current Hour: " + currentHour);
        console.log("to-do description: " + todoItem);
    //'testingCode': appends the date onto the identifier for the localStorage so it sets the date. Clears old to-do
        testingCode = scheduleHour+(moment().format("MMM"+"Do"));
            console.log("testing code: " + testingCode);
            localStorage.setItem(testingCode, todoItem);
    })
    // a loop since time is in 24-hour block & pulls what is stored.
    for(i=0; i <24; i++){
    // pulls the input ID, which is now appended with today's date. If it is not today's event; it won't pull it.
        $("#input-"+[i]).val(localStorage.getItem([i]+(moment().format("MMM"+"Do")))); 
    // highlights the current hour of today so you know where you're at on your schedule (w/ or without data)
        $("#"+currentHour).addClass("currently");
        console.log("current Hour: " + currentHour + ", date: " + (moment().format('MMM'+"Do")));
    }
    for (c=0; c <currentHour; c++){
        $("#"+c).addClass("previously");
        $("#input-"+c).attr("class", "form-control previously");
        $("#input-"+c).attr("readonly", "true");
    }
    /////////////////////SECTION FOR DONE  BUTTON///////////////////////////////////////
        
    $(".isdone").on("click", function(event) {
        event.preventDefault();
        doneHour = $(this).attr('id');
       let doneID= ("#"+ doneHour);
        // gets the value of the todo item
       let timesKey = "t"+doneHour+(moment().format("MMM"+"Do"));
       if($(doneID).val() === "undone"){
            $(doneID).attr("value","done");
       }else{
               $(doneID).attr("value", "undone");
               $(doneID).attr("class", "btn btn-outline-secondary undone");
            }
            let finishedEvent = $(doneID).val();
        console.log("DONE?to-do description: " + finishedEvent);
    //'testingCode': appends the date onto the identifier for the localStorage so it sets the date. Clears old to-do
            //localStorage.setItem(finishKey, finishedEvent);
            localStorage.setItem(timesKey, finishedEvent);
            console.log(" click value: " + timesKey + " , " + finishedEvent);
    //reloads the content classes & text as the button is clicked (mirror of line 73-82 attached to event)
            for(loadedClicks=0; loadedClicks < 24; loadedClicks++){
                let doneMet = localStorage.getItem("tdone-"+[loadedClicks]+(moment().format("MMM"+"Do")));
                let doneID= ("#done-" + loadedClicks);
                if(doneMet === "done" || doneMet === "undone"){
                    $(doneID).attr("class","btn btn-outline-secondary "+ doneMet);
                    $(doneID).text(doneMet);
                }else{
                    $(doneID).text("undone");
                    $(doneID).attr("class", "btn btn-outline-secondary undone");
                }}
    })
    // reloads the content that was previously saved when the page is loaded.
    for(loadedClicks=0; loadedClicks < 24; loadedClicks++){
        let doneMet = localStorage.getItem("tdone-"+[loadedClicks]+(moment().format("MMM"+"Do")));
        let doneID= ("#done-" + loadedClicks);
        if(doneMet === "done" || doneMet === "undone"){
            $(doneID).attr("class","btn btn-outline-secondary "+ doneMet);
            $(doneID).text(doneMet);
        }else{
            $(doneID).text("undone");
            $(doneID).attr("class", "btn btn-outline-secondary undone");
        }
        }

})