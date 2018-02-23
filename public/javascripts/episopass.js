// Generated by CoffeeScript 1.12.4
var answer, answerspan, calcpass, calcseed, crypt, cura, curq, editfunc, hover_in_func, hover_out_func, maindiv, minusfunc, plusfunc, qadiv, qas, qeditfunc, save, secretstr, selfunc, sendfile, showimage, timeout;

qas = data['qas'];

curq = 0;

cura = 0;

answer = [];

crypt = typeof require === 'undefined' ? exports : require('./crypt.js');

selfunc = function(q, a) {
  return function() {
    var j, ref, results;
    answer[q] = a;
    (function() {
      results = [];
      for (var j = 0, ref = qas[q]['answers'].length; 0 <= ref ? j < ref : j > ref; 0 <= ref ? j++ : j--){ results.push(j); }
      return results;
    }).apply(this).forEach(function(i) {
      return $("#answer" + q + "-" + i).css('background-color', i === a ? '#ccf' : '#fff');
    });
    return calcpass(true);
  };
};

editfunc = function(q, a) {
  return function() {
    curq = q;
    cura = a;
    qas[q]['answers'][a] = $("#answer" + q + "-" + a).val();
    return calcpass();
  };
};

timeout = null;

hover_in_func = function(q, a) {
  return function() {
    return timeout = setTimeout(selfunc(q, a), 400);
  };
};

hover_out_func = function() {
  return function() {
    return clearTimeout(timeout);
  };
};

answerspan = function(q, a) {
  var aspan, input;
  aspan = $('<span class="answer">');
  input = $('<input type="text" autocomplete="off" class="answer">').val(qas[q]['answers'][a]).attr('id', "answer" + q + "-" + a).css('background-color', a === 0 ? '#ccf' : '#fff').on('click', selfunc(q, a)).on('keyup', editfunc(q, a));
  return aspan.append(input);
};

showimage = function(str, img) {
  if (str.match(/\.(png|jpeg|jpg|gif)$/i)) {
    return img.attr('src', str).css('display', 'block');
  } else {
    return img.css('display', 'none');
  }
};

qeditfunc = function(q) {
  return function() {
    var img, str;
    str = $("#question" + q).val();
    qas[q]['question'] = str;
    img = $("#image" + q);
    showimage(str, img);
    return calcpass();
  };
};

minusfunc = function(q) {
  return function() {
    qas[q]['answers'].pop();
    return $("#answer" + q + "-" + qas[q]['answers'].length).remove();
  };
};

plusfunc = function(q) {
  return function() {
    var nelements;
    nelements = qas[q]['answers'].length;
    qas[q]['answers'].push('新しい回答例');
    return $("#delim" + q).before(answerspan(q, nelements));
  };
};

qadiv = function(q) {
  var ansdiv, delim, div, img, j, minus, plus, qdiv, qinput, qstr, ref, results;
  answer[q] = 0;
  div = $("<div class='qadiv'>").attr('id', "qadiv" + q);
  qdiv = $('<div width="100%" class="qdiv">');
  qstr = qas[q]['question'];
  qinput = $('<input type="text" autocomplete="off" class="qinput">').attr('id', "question" + q).val(qstr).on('keyup', qeditfunc(q));
  qdiv.append(qinput);
  div.append(qdiv);
  img = $("<img class='qimg'>").attr('id', "image" + q);
  div.append(img);
  showimage(qstr, img);
  ansdiv = $("<div class='ansdiv'>");
  (function() {
    results = [];
    for (var j = 0, ref = qas[q]['answers'].length; 0 <= ref ? j < ref : j > ref; 0 <= ref ? j++ : j--){ results.push(j); }
    return results;
  }).apply(this).forEach(function(i) {
    return ansdiv.append(answerspan(q, i));
  });
  delim = $('<span>  </span>').attr('id', "delim" + q);
  ansdiv.append(delim);
  minus = $('<input type="button" value=" - ">').on('click', minusfunc(q));
  ansdiv.append(minus);
  ansdiv.append($('<span>  </span>'));
  plus = $('<input type="button" value=" + ">').on('click', plusfunc(q));
  ansdiv.append(plus);
  return div.append(ansdiv).append($('<br clear="all">'));
};

maindiv = function() {
  var j, minus, plus, ref, results;
  $("#main").children().remove();
  (function() {
    results = [];
    for (var j = 0, ref = qas.length; 0 <= ref ? j < ref : j > ref; 0 <= ref ? j++ : j--){ results.push(j); }
    return results;
  }).apply(this).forEach(function(i) {
    return $("#main").append(qadiv(i));
  });
  minus = $('<input type="button" value=" - " id="qa_minus" class="qabutton">').click(function(event) {
    qas.pop();
    $("#qadiv" + qas.length).remove();
    return calcpass();
  });
  $("#main").append(minus);
  $("#main").append($('<span>  </span>'));
  plus = $('<input type="button" value=" + " class="qabutton">').click(function(event) {
    qas.push({
      question: "新しい質問",
      answers: ["回答11", "回答22", "回答33"]
    });
    $("#qa_minus").before(qadiv(qas.length - 1));
    return calcpass();
  });
  return $("#main").append(plus);
};

secretstr = function() {
  var j, ref, results;
  return (function() {
    results = [];
    for (var j = 0, ref = qas.length; 0 <= ref ? j < ref : j > ref; 0 <= ref ? j++ : j--){ results.push(j); }
    return results;
  }).apply(this).map(function(i) {
    return qas[i]['question'] + qas[i]['answers'][answer[i]];
  }).join('');
};

calcpass = function(copy) {
  var newpass;
  newpass = crypt.crypt($('#seed').val(), secretstr());
  return $('#pass').val(newpass);
};

calcseed = function() {
  var newseed;
  newseed = crypt.crypt($('#pass').val(), secretstr());
  $('#seed').val(newseed);
  return data['seed'] = newseed;
};

sendfile = function(files) {
  var file, fileReader;
  file = files[0];
  fileReader = new FileReader();
  fileReader.onload = function(event) {
    var data, json;
    json = event.target.result;
    $("#main").children().remove();
    data = JSON.parse(json);
    qas = data['qas'];
    maindiv();
    return calcpass();
  };
  fileReader.readAsText(file);
  return false;
};

save = function() {
  data['seed'] = $('#seed').val();
  alert(JSON.stringify(data));
  return $.ajax({
    type: "POST",
    async: false,
    url: "/" + name + "/__write",
    data: "data=" + (JSON.stringify(data))
  });
};

$(function() {
  $('#seed').keyup(function(e) {
    data['seed'] = $('#seed').val();
    return calcpass();
  });
  $('#pass').keyup(function(e) {
    return calcseed();
  });
  $("#save").click(function() {
    return save();
  });
  $("#das").click(function() {
    save();
    return window.open().location.href = "http://EpisoPass.com/EpisoDASMaker.html?name=" + name + "&selections=" + (answer.join(',')) + "&seed=" + ($('#seed').val());
  });
  $("#apk").click(function() {
    save();
    return location.href = "/" + name + ".apk";
  });
  if (!location.href.match(/^http/)) {
    $('#save').css('display', 'none');
    $('#apk').css('display', 'none');
  }
  $('#seed').val(seed);
  $('#qa_json').click(function(event) {
    var blob, d;
    event.preventDefault();
    d = JSON.stringify(data);
    blob = new Blob([d], {
      type: "text/plain;charset=utf-8"
    });
    return saveAs(blob, "qa.json");
  });
  $('body').bind("dragover", function(e) {
    return false;
  }).bind("dragend", function(e) {
    return false;
  }).bind("drop", function(e) {
    var files;
    e.preventDefault();
    files = e.originalEvent.dataTransfer.files;
    sendfile(files);
    return files;
  });
  $(window).on('pageshow', function() {
    return maindiv();
  });
  maindiv();
  return calcpass();
});
