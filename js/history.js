var txn_history = {
    isLive: app.isLiveApp,

    start: function() {
        $('#listHistory').html(`<tr>
                                  <td colspan="2"><small class="bold text-info">Loading...</small></td>
                                </tr>`);
        txn_history.process();

    },
    process: function(e) {
        $.post(app.API + '/web/pull/history', {
            'user': app.db().select("id")
        })
        .done(function(data) {
            //save the 
            var looop = null;

            if (data.status == 200) {
               
                if(data.history.length === 0){
                    looop = `<tr>
                                <td><small class="bold text-danger">Ooops! No History is available.<br> 
                                Try again later when you have performed a transaction</small> </td>
                            </tr> `;
                }else{
                    data.history.forEach(function(txn) {
                    looop +=   `<tr>
                                  <td><small class="bold text-info text-uppercase">`+ txn.title+`<br>`+`<span class="text-success">₦ `+txn.total+`</span></small></td>
                                  <td class="text-dark"><small class="bold">`+txn.date+`</small></td>
                                </tr>`
                    });
                }

            } else if (data.status == 300) {

                setTimeout(function(){ 
                    $('#history').modal('hide');
                }, 3000);

                looop = `<tr>
                            <td><small class="bold text-danger">`+data.title+`<br> 
                            `+data.msg+`</small> </td>
                        </tr> `;

            } else if (data.status == 400) {
                
                setTimeout(function(){ 
                    $('#history').modal('hide');
                }, 3000);

                looop = `<tr>
                            <td><small class="bold text-danger">Ooops! Something went wrong.<br> 
                            Please try again later</small> </td>
                        </tr> `;
            }

            $('#listHistory').html(looop);
        })
        .fail(function(data) {

            setTimeout(function(){ 
                $('#history').modal('hide');
            }, 3000);

            looop = `<tr>
                        <td><small class="bold text-danger">Ooops! Something went wrong.<br> 
                        Please try again later</small> </td>
                    </tr> `;
            $('#listHistory').html(looop);
        })
    }
}
