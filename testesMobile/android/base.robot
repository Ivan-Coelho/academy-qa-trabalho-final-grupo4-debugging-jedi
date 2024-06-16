*** Settings ***

Library    AppiumLibrary
Library    FakerLibrary
Library    RequestsLibrary

#Utils
Resource    utils/config.robot
Resource    utils/commons.robot
Resource    utils/commonsApi.robot

#Pages
Resource    android/pages/registrarPage.robot
Resource    android/pages/loginTest.robot
Resource    page/Page.robot
Resource    page/detalhesPage.robot
