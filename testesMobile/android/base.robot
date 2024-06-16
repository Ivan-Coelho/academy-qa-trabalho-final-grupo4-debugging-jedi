*** Settings ***

Library    AppiumLibrary
Library    FakerLibrary
Library    RequestsLibrary
Library    XML

#Utils
Resource    utils/config.robot
Resource    utils/commons.robot
Resource    utils/commonsApi.robot

#Pages
Resource    page/Page.robot
Resource    page/detalhesPage.robot
Resource    page/avaliacaoPage.robot
Resource    page/Filme.robot
Resource    page/loginPage.robot
