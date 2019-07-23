"use strict"

b4w.register("B4W_ARSENAL_main", function(exports, require) {

var m_app       = require("app");
var m_cfg       = require("config");
var m_data      = require("data");
var m_preloader = require("preloader");
var m_ver       = require("version");

var m_anim      = require("animation");
var m_cont      = require("container");
var m_mouse     = require("mouse");
var m_scenes    = require("scenes");
var m_ln        = b4w.require("logic_nodes");
var m_cam       = require("camera");

var m_fps       = require("fps");
var m_trans     = require("transform");
var m_quat      = require("quat");
var m_vec3      = require("vec3");
var m_util      = require("util");
var m_time      = require("time");
var m_screen = require("screen");

var DEBUG = (m_ver.type() == "DEBUG");

exports.init = function() {
    m_app.init({
        canvas_container_id: "main_canvas_container",
        callback: init_cb,
        show_fps: false,
        console_verbose: DEBUG,
        //assets_dds_available: true,
        //assets_min50_available: true,
        //assets_gzip_available: true,
        autoresize: true,
    });
}

function init_cb(canvas_elem, success) {
    if (!success) {
        console.log("b4w init failure");
        return;   }
    m_preloader.create_preloader();
    canvas_elem.oncontextmenu = function(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;    };
    load();
}

function load() {
	var preloader_cont = document.getElementById("preloader_cont");
			preloader_cont.style.visibility = "visible";
			m_data.load("RESOURCE/DATA/B4W_ARSENAL_INTERIOR.json", load_cb, preloader_cb);
}

function preloader_cb(percentage) {
    m_preloader.update_preloader(percentage);
    var prelod_dynamic_path = document.getElementById("prelod_dynamic_path");
    prelod_dynamic_path.style.width = percentage + "%";
    if (percentage == 100) {
		    var preloader_cont = document.getElementById("preloader_cont");
				preloader_cont.style.visibility = "hidden";
  	  return;
    }
}

function start_init(){
    splash_screen.style.display		= 'none';
//		m_app.enable_camera_controls();
    m_fps.enable_fps_controls();

// Выбор поддерживаемого метода FullScreen
    function fullScreen(element) {
      if(element.requestFullscreen) {
        element.requestFullscreen();
      } else if(element.webkitrequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if(element.mozRequestFullscreen) {
        element.mozRequestFullScreen();
      }
    }

// Для всей страницы
    var html = document.documentElement;
    fullScreen(html);

// Для конкретного канваса
    //var canvas = document.getElementById('main_canvas_container');
    //fullScreen(canvas);

}

//**************  START APPLICATION  *******************************************************************************
function load_cb(data_id, success) {
	if (!success) {console.log("b4w load failure"); return;}
		splash_screen.style.display = 'block';
		splash_screen.onclick 	= function() {   start_init() }
}
//**************  FINISH APPLICATION  *************************************************************************

}); // finish

// import the app module and start the app by calling the init method
b4w.require("B4W_ARSENAL_main").init();
