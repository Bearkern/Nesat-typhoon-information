var xhr = new XMLHttpRequest();
xhr.open('get', 'https://tcgbusfs.blob.core.windows.net/blobfs/GetDisasterSummary.json#', true);
xhr.send();
xhr.onload = function() {
  var selectZone = document.getElementById('selectZoneId');
  selectZone.addEventListener('change', showData, false);
  var caseInfo = document.querySelector('.caseInfo');
  var dataStr = JSON.parse(xhr.responseText);
  var data = dataStr.DataSet["diffgr:diffgram"].NewDataSet.CASE_SUMMARY;
  var dataLen = data.length;
  var str = '<tr>';
  str += '<th class="caseTime">發生時間</th>';
  str += '<th class="area">區域</th>';
  str += '<th class="location">詳細位置</th>';
  str += '<th class="description">描述</th>';
  str += '</tr>';

  for(var i = 0; i < dataLen; i++) {
    if (data[i].CaseComplete == 'false') {
      str += '<tr>';
      str += '<td class="caseTime">' + data[i].CaseTime + '</td>';
      str += '<td class="area">';
      str += '<span class="label">' + data[i].CaseLocationDistrict + '</span>';
      str += '</td>';
      str += '<td class="location">' + data[i].CaseLocationDescription + '</td>';
      str += '</td>';
      str += '<td class="description">' + data[i].CaseDescription + '</td>';
      str += '</tr>';
    }
  }
  caseInfo.innerHTML = str;
  
  function showData(e) {
    str = '<tr>';
    str += '<th class="caseTime">發生時間</th>';
    str += '<th class="area">區域</th>';
    str += '<th class="location">詳細位置</th>';
    str += '<th class="description">描述</th>';
    str += '</tr>';
    
    for(var i = 0; i < dataLen; i++) {
      if (e.target.value == data[i].CaseLocationDistrict && data[i].CaseComplete == 'false') {
        str += '<tr>';
        str += '<td class="caseTime">' + data[i].CaseTime + '</td>';
        str += '<td class="area">';
        str += '<span class="label">' + data[i].CaseLocationDistrict + '</span>';
        str += '</td>';
        str += '<td class="location">' + data[i].CaseLocationDescription + '</td>';
        str += '</td>';
        str += '<td class="description">' + data[i].CaseDescription + '</td>';
        str += '</tr>';
      } else if (e.target.value == '-- 依區域搜尋 --') {
        str += '<tr>';
        str += '<td class="caseTime">' + data[i].CaseTime + '</td>';
        str += '<td class="area">';
        str += '<span class="label">' + data[i].CaseLocationDistrict + '</span>';
        str += '</td>';
        str += '<td class="location">' + data[i].CaseLocationDescription + '</td>';
        str += '</td>';
        str += '<td class="description">' + data[i].CaseDescription + '</td>';
        str += '</tr>';
      }
    }
    caseInfo.innerHTML = str;
  }
}

