'use strict';

let showMoreDownloads = false;
let sortedVersions;

function toggleMoreDownloads(event) {
  event.preventDefault();

  showMoreDownloads = !showMoreDownloads;
  let btn = $('.show-more-downloads-btn');
  let moreDownloadsDiv = $('.more-downloads');

  moreDownloadsDiv.toggle();

  if (showMoreDownloads) { btn.html('<span class="fa fa-chevron-up"></span>&nbsp;hide more downloads'); }
  else { btn.html('<span class="fa fa-chevron-down"></span>&nbsp;show more downloads'); }

  return false;
}

$(function () {

  function parseXML(xml) {
    let files = $(xml).find('ListBucketResult').find('Contents');
    let downloads = {};
    let nightlies = { title:'Nightly', downloads:[] };
    let commities = { title:'Last Commit', downloads:[] };

    for (let i = 0, len = files.length; i < len; ++i) {
      let file = $(files[i]);
      let key  = file.find('Key').text();

      if (key.startsWith('builds/')) {
        let keyArr = key.split('/');
        let os     = keyArr[1];
        let vers   = keyArr[2];
        let time   = new Date(file.find('LastModified').text());

        time = `${time.getFullYear()}-${('0'+(time.getMonth()+1)).slice(-2)}-${('0'+time.getDate()).slice(-2)}`;

        let uniqueVers = vers.match(/([0-9]+)\.([0-9]+)\.([0-9]+)/g);

        let osTitle = os.replace('-', ' ');
        osTitle = osTitle.charAt(0).toUpperCase() + osTitle.slice(1);

        let download = {
          url  : `https://files.molo.ch/${key}`,
          title: osTitle
        };

        if (!uniqueVers && vers.includes('nightly')) {
          if (!nightlies.time) { nightlies.modified = time; }
          nightlies.downloads.push(download);
          continue;
        }

        uniqueVers = uniqueVers[0];

        // group by version
        if (!downloads.hasOwnProperty(uniqueVers)) {
          downloads[uniqueVers] = {
            title     : `Moloch ${uniqueVers}`,
            downloads : [download],
            modified  : time
          };
        } else {
          downloads[uniqueVers].downloads.push(download);
        }
      } else if (key.startsWith('moloch-master')) {
        let keyArr = key.split(key[13]);
        let os = keyArr[1];
        let time   = new Date(file.find('LastModified').text());
        time = `${time.getFullYear()}-${('0'+(time.getMonth()+1)).slice(-2)}-${('0'+time.getDate()).slice(-2)} ${('0'+time.getHours()).slice(-2)}:${('0'+time.getMinutes()).slice(-2)}:${('0'+time.getSeconds()).slice(-2)}`;

        let osTitle = {centos6: "Centos 6", centos7: "Centos 7", ubuntu14: "Ubuntu 14.04", ubuntu16: "Ubuntu 16.04", ubuntu18: "Ubuntu 18.04"}[os];

        let download = {
          url  : `https://files.molo.ch/${key}`,
          title: osTitle
        };
        commities.modified = time;
        commities.downloads.push(download);
      }
    }

    sortedVersions = Object.keys(downloads).reverse();

    return { downloads:downloads, nightlies:nightlies, commities:commities };
  }

  function buildDownloadVersionRow(version, btnType) {
    let html = `<div class="row margined-bottom-xs">
                 <div class="col-md-2">
                   <div><strong>${version.title}</strong></div>
                   <div class="time"><small>${version.modified}</small></div>
                 </div>`;

    let downloads = version.downloads;
    for (let i = 0, len = downloads.length; i < len; ++i) {
      let download = downloads[i];
      html += `<div class="col-md-2">
                 <a href="${download.url}" class="btn ${btnType}">
                   ${download.title}
                 </a>
               </div>`;
    }

    html += '</div>';

    return html;
  }

  function setupPage(versions, nightlies, commities) {
    let mainDownloadsHtml = '', moreDownloadsHtml = '';

    let nightlyDownloadsHtml = buildDownloadVersionRow(nightlies, 'btn-outline-danger');
    let commitDownloadsHtml = buildDownloadVersionRow(commities, 'btn-outline-danger');

    for (var v = 0, vlen = sortedVersions.length; v < vlen; ++v) {
      if (versions.hasOwnProperty(sortedVersions[v])) {
        let version = versions[sortedVersions[v]];
        let html = buildDownloadVersionRow(version, 'btn-outline-primary');

        if (v < 3)  { mainDownloadsHtml += html; }
        else        { moreDownloadsHtml += html; }
      }
    }

    $('.main-downloads').append(mainDownloadsHtml);
    $('.more-downloads').append(moreDownloadsHtml);
    $('.nightly-downloads').append(nightlyDownloadsHtml);
    $('.commit-downloads').append(commitDownloadsHtml);
  }

  function setupError() {
    $('.downloads-error').show();
    $('.loading-downloads').hide();
    $('.nightly-downloads').hide();
    $('.commit-downloads').hide();
    $('.show-more-downloads-btn').hide();
  }

  $.ajax({
    url: 'https://s3.amazonaws.com/files.molo.ch',
    type: 'GET',
    crossDomain: true,
    dataType: 'xml',
    success: function(xml) {
      let downloads = parseXML(xml);
      setupPage(downloads.downloads, downloads.nightlies, downloads.commities);
      $('.loading-downloads').hide();
    },
    error: function(xhr, textStatus, errorThrown) {
      setupError();
    }
  });

});
