function auto_delete_mails() 
{ 
  var maxDate = new Date(); 
  maxDate.setDate( maxDate.getDate() - 60 );

  deleteMe = GmailApp.getUserLabelByName("Delete Me")
  var numLabels = 0;
  var numThreads = 0;
  var batchSize = 500;
  for( var batch = 7; true; batch++ ) {
    var threads = deleteMe.getThreads( batch*batchSize, batchSize );
    if( threads.length == 0 ) {
      console.log( 'no threads ' + '  batch: ' + batch.toString() + '  deleted: ' + numLabels.toString() );
      break;
    }
    console.log( 'batch#: ' + batch.toString() + ' Threads: ' + numThreads.toString() + '   deleted: ' + numLabels.toString() + '  threads: ' + threads.length.toString() );

    for (var i = 0; i < threads.length; i++) {
      thread = threads[i]
      if ( i == 0 ) console.log('Date: ' + thread.getLastMessageDate().toString() )
      if ( thread.getLastMessageDate() < maxDate ) { 
        thread.moveToTrash();
        numLabels++;
      }
    }
    numThreads += batchSize;
  } 
}

function labelAll() {
  var delayDays = 60; // Number of days before messages are moved to trash 
  var maxDate = new Date(); 
  maxDate.setDate( maxDate.getDate() - delayDays );
  deleteMe = GmailApp.getUserLabelByName("Delete Me")
  var numLabels = 0;
  var numThreads = 0;
  var batchSize = 500;
  for( var batch = 0; true; batch++ ) {
    var threads = GmailApp.getInboxThreads( batch*batchSize, batchSize );
    if( threads.length == 0 ) {
      console.log( 'no more threads ' + '  batch: ' + batch.toString() + '  labelled: ' + numLabels.toString() );
      break;
    }

    console.log( 'batch#: ' + batch.toString() + ' Threads: ' + numThreads.toString() + '   labels added: ' + numLabels.toString() + '  threads: ' + threads.length.toString() );

    if ( threads[ threads.length - 1 ].getLastMessageDate() >= maxDate ) { 
      continue
    }
    for (var i = 0; i < threads.length; i++) {
      thread = threads[i]
      if ( i == 0 ) console.log('Date: ' + thread.getLastMessageDate().toString() )
      if ( thread.getLastMessageDate() < maxDate ) { 
        thread.addLabel(deleteMe);
        numLabels++;
        //console.log( i.toString() )
      }
    }
    numThreads += batchSize;
  } 
}
