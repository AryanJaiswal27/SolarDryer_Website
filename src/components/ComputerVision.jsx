import React, { useState } from 'react';
import { Database, ScanEye } from 'lucide-react';
import InteractiveFolderTree from './InteractiveFolderTree';
import ImageComparisonSlider from './ImageComparisonSlider';
import './ComputerVision.css';

// Dynamically import all raw and annotated images
const rawModules = import.meta.glob('../assets/samples/*_raw.jpeg', { eager: true });
const annotatedModules = import.meta.glob('../assets/samples/*_annotated.jpeg', { eager: true });

const imagePairs = Object.keys(rawModules).map(rawKey => {
  const prefix = rawKey.replace('_raw.jpeg', '');
  const annotatedKey = prefix + '_annotated.jpeg';
  return {
    raw: rawModules[rawKey].default,
    annotated: annotatedModules[annotatedKey]?.default,
    name: prefix.split('/').pop()
  };
}).filter(pair => pair.annotated);

const chilliVarieties = [
  { name: 'Aarmor Chillies', code: 'AAR', single: 107, grouped: 21, total: 128, cost: '190 - 200 rupees' },
  { name: 'Bhewapuri Chillies', code: 'BWP', single: 124, grouped: 17, total: 141, cost: '190 - 220 rupees' },
  { name: 'C5 Chillies', code: 'C5C', single: 95, grouped: 21, total: 116, cost: '200 - 220 rupees' },
  { name: 'DD Chillies', code: 'DDC', single: 100, grouped: 18, total: 118, cost: '300 rupees' },
  { name: 'Local Teja Chillies', code: 'LTC', single: 86, grouped: 19, total: 105, cost: '170 - 180 rupees' },
  { name: 'Patna Chillies', code: 'PAT', single: 98, grouped: 11, total: 109, cost: '300 - 350 rupees' },
  { name: 'Roshni Chillies', code: 'ROS', single: 107, grouped: 15, total: 122, cost: '220 rupees' },
  { name: 'Warangal Teja Chillies', code: 'WTJ', single: 108, grouped: 18, total: 126, cost: '200 - 220 rupees' },
  { name: 'Wonderlat Chillies', code: 'WDL', single: 90, grouped: 15, total: 105, cost: '300 rupees' },
];

const ComputerVision = () => {
  const [activePairIndex, setActivePairIndex] = useState(0);

  return (
    <section className="cv-section" id="computer-vision">
      <div className="cv-container">
        
        <div className="cv-header">
          <h2><span className="gradient-text">Computer Vision</span> Integration</h2>
          <p>Automated chilli identification and quality grading using custom-built datasets and Python-based machine learning models.</p>
        </div>

        <div className="cv-layout-stack">
          
          {/* Section 1: Slider (Top) */}
          <div className="cv-slider-section">
            <div className="slider-container-wrapper mx-auto">
              <h3 className="section-subtitle">Interactive Bounding Boxes</h3>
              <p className="section-desc">Drag the slider to reveal the ground truth annotations.</p>
              
              {imagePairs.length > 0 && (
                <>
                  <ImageComparisonSlider 
                    beforeImage={imagePairs[activePairIndex].raw} 
                    afterImage={imagePairs[activePairIndex].annotated} 
                  />
                  
                  <div className="pair-selectors">
                    {imagePairs.map((pair, idx) => (
                      <button 
                        key={idx}
                        className={`pair-btn ${idx === activePairIndex ? 'active' : ''}`}
                        onClick={() => setActivePairIndex(idx)}
                      >
                        Sample {idx + 1}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Section 2: Data Table (Middle) */}
          <div className="cv-table-section glass-panel">
            <h3 className="table-title">Chilli Varieties Dataset Breakdown</h3>
            <div className="table-responsive">
              <table className="cv-table">
                <thead>
                  <tr>
                    <th>Variety Name</th>
                    <th>Code</th>
                    <th>Single</th>
                    <th>Grouped</th>
                    <th>Total</th>
                    <th>Cost Info</th>
                  </tr>
                </thead>
                <tbody>
                  {chilliVarieties.map((item, idx) => (
                    <tr key={idx}>
                      <td><strong>{item.name}</strong></td>
                      <td><code>{item.code}</code></td>
                      <td>{item.single}</td>
                      <td>{item.grouped}</td>
                      <td className="highlight-cell">{item.total}</td>
                      <td>{item.cost}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="2"><strong>TOTALS</strong></td>
                    <td><strong>915</strong></td>
                    <td><strong>155</strong></td>
                    <td className="highlight-cell"><strong>1,070</strong></td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Section 3: Deep Dive Cards (Bottom side-by-side) */}
          <div className="cv-cards-grid">
            
            {/* Left Card */}
            <div className="cv-card glass-panel">
              <div className="cv-card-header">
                <div className="icon-badge">
                  <Database size={24} />
                </div>
                <h3>Annotated Dataset</h3>
              </div>
              <p>
                To train our classification models (Variety, Stem, Broken), we created a massive image database meticulously annotated by hand.
              </p>
              <ul className="cv-list">
                <li><strong>1,070 Total Images:</strong> Featuring 9 distinct chilli varieties including Aarmor, Bhewapuri, and Patna.</li>
                <li><strong>Dual Annotations:</strong> Bounding boxes explicitly drawn for both the main chilli body and the stem.</li>
              </ul>
              <p>
                The dataset is strictly structured to support our `dataset_annotator.py` and `train_sota.py` pipelines. Explore the directory structure below:
              </p>
              <InteractiveFolderTree />
            </div>

            {/* Right Card */}
            <div className="cv-card glass-panel">
              <div className="cv-card-header">
                <div className="icon-badge">
                  <ScanEye size={24} />
                </div>
                <h3>Chilli Segmentation & Detection</h3>
              </div>
              <p>
                Before deep learning kicks in, our computer vision pipeline utilizes classical heuristics to quickly filter out defective chillies based on shape morphology.
              </p>
              <ul className="cv-list">
                <li><strong>Solidity Analysis:</strong> We extract the contour of the chilli. If the area divided by the convex hull area drops below 0.93, it signifies a curved/bent chilli.</li>
                <li><strong>Aspect Ratio:</strong> Broken tips are instantly flagged when the length-to-width ratio falls below 2.4, as broken chillies are physically shorter and blunter.</li>
              </ul>
              
              <div className="code-wrapper">
                <div className="code-header">
                  <span>features.py</span>
                </div>
                <div className="code-placeholder">
                  <code>
<span className="keyword">def</span> <span className="function">analyze_single_contour</span>(c, thresh, img):<br/>
&nbsp;&nbsp;&nbsp;&nbsp;feat = extract_shape_metrics(c)<br/>
<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span className="comment"># 1. Straight vs Curved Analysis</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;solidity = feat.get(<span className="string">'solidity'</span>, 1.0)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;feat[<span className="string">'is_straight'</span>] = 1 <span className="keyword">if</span> solidity &gt;= 0.93 <span className="keyword">else</span> 0<br/>
<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span className="comment"># 2. Broken Detection</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;aspect_ratio = feat.get(<span className="string">'aspect_ratio'</span>, 3.0)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;feat[<span className="string">'is_broken'</span>] = 1 <span className="keyword">if</span> aspect_ratio &lt; 2.4 <span className="keyword">else</span> 0<br/>
<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span className="keyword">return</span> feat
                  </code>
                </div>
              </div>
            </div>


          </div>
          
          {/* Section 4: Breakdown by Variety */}
          <div className="cv-accuracy-section glass-panel">
            <div className="cv-card-header" style={{ marginBottom: '1.5rem' }}>
              <div className="icon-badge">
                <ScanEye size={24} />
              </div>
              <h3>Detection Breakdown by Variety</h3>
            </div>
            <ul className="cv-list">
              <li><em>Aarmor Chillies (190-200)</em>: 100.0% accurate (107/107)</li>
              <li><em>Bhewapuri Chillies (190-220)</em>: 96.0% accurate (119/124), 5 &gt;1 chillies</li>
              <li><em>C5 Chillies (200-220)</em>: 100.0% accurate (95/95)</li>
              <li><em>DD Chillies (300)</em>: 98.0% accurate (98/100), 2 &gt;1 chillies</li>
              <li><em>Local Teja Chillies (170-180)</em>: 96.5% accurate (83/86), 3 &gt;1 chillies</li>
              <li><em>Patna Chillies (300-350)</em>: 100.0% accurate (98/98)</li>
              <li><em>Roshni Chillies (220)</em>: 100.0% accurate (107/107)</li>
              <li><em>Warangal Teja Chillies (200-220)</em>: 99.1% accurate (107/108), 1 0 chillies</li>
              <li><em>Wonderlat Chillies (300)</em>: 100.0% accurate (90/90)</li>
            </ul>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem', marginTop: '1.5rem' }}>
              With a <em>98.8% success rate</em>, the physical detection heuristic is incredibly robust. The minor false positives (detecting &gt;1 chilli) are primarily attributed to harsh shadows or detached physical stems separating from the main chilli body, which can be mitigated in later machine learning classification stages.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ComputerVision;
