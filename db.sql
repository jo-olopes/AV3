-- Criar banco de dados (opcional)
CREATE DATABASE portfolio_academico;
USE portfolio_academico;

---------------------------------------------------------
-- TABELA: perfil
---------------------------------------------------------
CREATE TABLE perfil (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(200) NOT NULL,
    cargo VARCHAR(200) NOT NULL,
    descricao TEXT,
    foto VARCHAR(300)  -- caminho da imagem no /public/
);

-- Inserir registro inicial (o sistema usa sempre o id = 1)
INSERT INTO perfil (nome, cargo, descricao, foto)
VALUES ('Nome Completo', 'Cargo Profissional', 'Pequena descrição pessoal', '/uploads/foto-perfil.png');


---------------------------------------------------------
-- TABELA: projetos
---------------------------------------------------------
CREATE TABLE IF NOT EXISTS projetos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(200) NOT NULL,
    descricao TEXT,
    descricao_detalhada LONGTEXT,
    tecnologias VARCHAR(300),
    github VARCHAR(300),
    imagem VARCHAR(300)  -- caminho no /public/uploads/
);


---------------------------------------------------------
-- TABELA: formacoes
---------------------------------------------------------
CREATE TABLE IF NOT EXISTS formacoes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(200) NOT NULL,
    descricao TEXT,
    descricao_detalhada LONGTEXT,
    tempo VARCHAR(100),
    certificado VARCHAR(300),   -- caminho para PDF/IMG no public/uploads
    imagem VARCHAR(300)         -- imagem principal
);


---------------------------------------------------------
-- TABELA: experiencias
---------------------------------------------------------
CREATE TABLE IF NOT EXISTS experiencias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(200) NOT NULL,
    descricao TEXT,
    descricao_detalhada LONGTEXT,
    tempo VARCHAR(100),         -- Ex: "2019-2021", "2 anos", "8 meses"
    imagem VARCHAR(300)         -- caminho da imagem
);


---------------------------------------------------------
-- TABELA: links_profissionais
---------------------------------------------------------
CREATE TABLE IF NOT EXISTS links_profissionais (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,  -- Ex: LinkedIn, GitHub, Instagram
    url VARCHAR(300) NOT NULL
);

SELECT * FROM projetos;
