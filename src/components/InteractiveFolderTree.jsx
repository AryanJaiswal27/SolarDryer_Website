import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Folder, FolderOpen, FileText, Image as ImageIcon, Code, Database } from 'lucide-react';
import './InteractiveFolderTree.css';

const FileNode = ({ name, type }) => {
  const getIcon = () => {
    switch (type) {
      case 'image': return <ImageIcon size={16} className="file-icon image-icon" />;
      case 'python': return <Code size={16} className="file-icon python-icon" />;
      case 'csv': return <Database size={16} className="file-icon csv-icon" />;
      default: return <FileText size={16} className="file-icon text-icon" />;
    }
  };

  return (
    <div className="tree-node file-node">
      <div className="node-content">
        <span className="node-spacer"></span>
        {getIcon()}
        <span className="node-name">{name}</span>
      </div>
    </div>
  );
};

const FolderNode = ({ name, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="tree-node folder-node">
      <div className="node-content" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <ChevronDown size={16} className="caret" /> : <ChevronRight size={16} className="caret" />}
        {isOpen ? <FolderOpen size={16} className="folder-icon open" /> : <Folder size={16} className="folder-icon" />}
        <span className="node-name font-semibold">{name}</span>
      </div>
      
      {isOpen && (
        <div className="node-children">
          {children}
        </div>
      )}
    </div>
  );
};

const InteractiveFolderTree = () => {
  return (
    <div className="folder-tree-container">
      <div className="tree-header">
        <span className="mac-dot red"></span>
        <span className="mac-dot yellow"></span>
        <span className="mac-dot green"></span>
        <span className="tree-title">Dataset Structure</span>
      </div>
      
      <div className="tree-body">
        <FolderNode name="Annotated_Chillies_Dataset" defaultOpen={true}>
          
          <FolderNode name="Aarmor Chillies (190-200)" defaultOpen={true}>
            <FolderNode name="single">
              <FileNode name="AAR_S_0001.jpeg" type="image" />
              <FileNode name="..." type="text" />
            </FolderNode>
            <FolderNode name="grouped">
              <FileNode name="..." type="text" />
            </FolderNode>
            <FileNode name="ground_truth.csv" type="csv" />
            <FileNode name="bboxes.csv" type="csv" />
            <FileNode name="info.txt" type="text" />
          </FolderNode>
          
          <FolderNode name="Bhewapuri Chillies (190-220)">
            <FileNode name="..." type="text" />
          </FolderNode>
          
          <FolderNode name="apps" defaultOpen={true}>
            <FolderNode name="inspector_app" defaultOpen={true}>
              <FileNode name="dataset_annotator.py" type="python" />
              <FileNode name="features.py" type="python" />
              <FileNode name="train_deep.py" type="python" />
              <FileNode name="..." type="text" />
            </FolderNode>
            <FolderNode name="classical_app">
              <FileNode name="..." type="text" />
            </FolderNode>
          </FolderNode>
          
          <FolderNode name="cropped_dataset">
            <FileNode name="..." type="text" />
          </FolderNode>
          
          <FileNode name="dataset_metadata.json" type="text" />
          <FileNode name="dataset_overview.md" type="text" />
          
        </FolderNode>
      </div>
    </div>
  );
};

export default InteractiveFolderTree;
