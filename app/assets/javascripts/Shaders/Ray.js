//This file is automatically rebuilt by the Cesium build process.
/*global define*/
define(function() {
"use strict";
return "/**\n\
 * DOC_TBA\n\
 *\n\
 * @name czm_raySegmentCollectionCapacity\n\
 * @glslConstant \n\
 *\n\
 * @see czm_raySegmentCollection\n\
 */\n\
const int czm_raySegmentCollectionCapacity = 4;\n\
\n\
/**\n\
 * DOC_TBA\n\
 *\n\
 * @name czm_raySegmentCollection\n\
 * @glslStruct\n\
 *\n\
 * @see czm_raySegmentCollectionCapacity\n\
 * @see czm_raySegment\n\
 */\n\
struct czm_raySegmentCollection\n\
{\n\
    czm_raySegment intervals[czm_raySegmentCollectionCapacity];\n\
    int count;\n\
};\n\
\n\
/**\n\
 * DOC_TBA\n\
 *\n\
 * @name czm_raySegmentCollectionNew\n\
 * @glslFunction\n\
 *\n\
 */\n\
czm_raySegmentCollection czm_raySegmentCollectionNew()\n\
{\n\
    czm_raySegment intervals[czm_raySegmentCollectionCapacity];\n\
    czm_raySegmentCollection i = czm_raySegmentCollection(intervals, 0);\n\
    return i;\n\
}\n\
\n\
czm_raySegmentCollection czm_raySegmentCollectionNew(czm_raySegment segment)\n\
{\n\
    czm_raySegment intervals[czm_raySegmentCollectionCapacity];\n\
    intervals[0] = segment;\n\
    czm_raySegmentCollection i = czm_raySegmentCollection(intervals, 1);\n\
    return i;\n\
}\n\
\n\
czm_raySegmentCollection czm_raySegmentCollectionNew(czm_raySegment first, czm_raySegment second)\n\
{\n\
    czm_raySegment intervals[czm_raySegmentCollectionCapacity];\n\
    intervals[0] = first;\n\
    intervals[1] = second;\n\
    czm_raySegmentCollection i = czm_raySegmentCollection(intervals, 2);\n\
    return i;\n\
}\n\
\n\
///////////////////////////////////////////////////////////////////////////////\n\
\n\
/**\n\
 * DOC_TBA\n\
 *\n\
 * @name czm_removeAt\n\
 * @glslFunction\n\
 *\n\
 */\n\
void czm_removeAt(inout czm_raySegmentCollection collection, int index)\n\
{\n\
    --collection.count;\n\
    for (int i = 0; i < czm_raySegmentCollectionCapacity; ++i)\n\
    {\n\
        if (i >= index && i < collection.count)\n\
        {\n\
            collection.intervals[i] = collection.intervals[i + 1];\n\
        }\n\
        else if (i == collection.count)\n\
        {\n\
            break;\n\
        }\n\
    }\n\
}\n\
\n\
///////////////////////////////////////////////////////////////////////////////\n\
\n\
/**\n\
 * DOC_TBA\n\
 *\n\
 * @name czm_insertAt\n\
 * @glslFunction\n\
 *\n\
 */\n\
void czm_insertAt(inout czm_raySegmentCollection collection, czm_raySegment segment, int index)\n\
{\n\
    for (int i = czm_raySegmentCollectionCapacity - 1; i >= 0; --i)\n\
    {\n\
        if (i <= collection.count && i > index)\n\
        {\n\
            collection.intervals[i] = collection.intervals[i - 1];\n\
        }\n\
        else if (i == index)\n\
        {\n\
            collection.intervals[i] = segment;\n\
        }\n\
        else if (i < index)\n\
        {\n\
            break;\n\
        }\n\
    }\n\
    ++collection.count;\n\
}\n\
\n\
void czm_insertAt(inout czm_raySegmentCollection collection, czm_raySegmentCollection segments, int index)\n\
{\n\
    if (segments.count == 1)\n\
    {\n\
        czm_insertAt(collection, segments.intervals[0], index);\n\
    }\n\
    else\n\
    {\n\
        for (int i = czm_raySegmentCollectionCapacity - 1; i >= 0; --i)\n\
        {\n\
            if (i < segments.count)\n\
            {\n\
                czm_insertAt(collection, segments.intervals[i], index);\n\
            }\n\
        }\n\
    }\n\
}\n\
\n\
///////////////////////////////////////////////////////////////////////////////\n\
\n\
/**\n\
 * DOC_TBA\n\
 *\n\
 * @name czm_complement\n\
 * @glslFunction\n\
 *\n\
 */\n\
void czm_complement(czm_raySegment segment, out czm_raySegmentCollection collection)\n\
{\n\
    if (czm_isEmpty(segment))\n\
    {\n\
        collection = czm_raySegmentCollectionNew(czm_fullRaySegment);\n\
    }\n\
    else if (segment.stop == czm_infinity)\n\
    {\n\
        if (segment.start == 0.0)\n\
        {\n\
	        collection = czm_raySegmentCollectionNew();\n\
        }\n\
        else\n\
        {\n\
	        collection = czm_raySegmentCollectionNew(czm_raySegment(0.0, segment.start));\n\
        }\n\
    }\n\
    else if (segment.start == 0.0)\n\
    {\n\
        collection = czm_raySegmentCollectionNew(czm_raySegment(segment.stop, czm_infinity));\n\
    }\n\
    else\n\
    {\n\
	    czm_raySegment head = czm_raySegment(0.0, segment.start);\n\
	    czm_raySegment tail = czm_raySegment(segment.stop, czm_infinity);\n\
	    collection = czm_raySegmentCollectionNew(head, tail);\n\
    }        \n\
}\n\
\n\
czm_raySegmentCollection czm_complement(czm_raySegmentCollection collection)\n\
{\n\
    if (collection.count == 0)\n\
    {\n\
        czm_raySegmentCollection result = czm_raySegmentCollectionNew(czm_fullRaySegment);\n\
        return result;\n\
    }\n\
    else if (collection.count == 1)\n\
    {\n\
        czm_raySegmentCollection result;\n\
        czm_complement(collection.intervals[0], result);\n\
        return result;\n\
    }\n\
\n\
    czm_raySegmentCollection result = czm_raySegmentCollectionNew();\n\
\n\
    for (int i = 0; i < czm_raySegmentCollectionCapacity; ++i)\n\
    {\n\
        if (i < collection.count)\n\
        {\n\
            float start = collection.intervals[i].stop;\n\
            if (i < collection.count - 1)\n\
            {\n\
                float stop = collection.intervals[i + 1].start;\n\
                result.intervals[i] = czm_raySegment(start, stop);\n\
                ++result.count;\n\
            }\n\
            else if (start != czm_infinity)\n\
            {\n\
                result.intervals[i] = czm_raySegment(start, czm_infinity);\n\
                ++result.count;\n\
            }\n\
        }\n\
        else\n\
        {\n\
            break;\n\
        }\n\
    }\n\
    \n\
    if (collection.count > 0)\n\
    {\n\
        float stop = collection.intervals[0].start;\n\
        if (stop != 0.0)\n\
        {\n\
            // PERFORMANCE TODO: See if the additional loop iteration from the insert can be eliminated.\n\
            czm_insertAt(result, czm_raySegment(0.0, stop), 0);\n\
        }\n\
    }\n\
    \n\
    return result;\n\
}\n\
\n\
///////////////////////////////////////////////////////////////////////////////\n\
\n\
/**\n\
 * DOC_TBA\n\
 *\n\
 * @name czm_union\n\
 */\n\
czm_raySegmentCollection czm_union(czm_raySegment left, czm_raySegment right)\n\
{\n\
    if (czm_isFull(left) || czm_isFull(right))\n\
    {\n\
        czm_raySegmentCollection result = czm_raySegmentCollectionNew(czm_fullRaySegment);\n\
        return result;\n\
    }\n\
\n\
    float stop = min(left.stop, right.stop);\n\
    float start = max(left.start, right.start);\n\
    \n\
    if (stop < start) // No intersection.\n\
    {\n\
        czm_raySegmentCollection result = (left.start < right.start) ? czm_raySegmentCollectionNew(left, right) : czm_raySegmentCollectionNew(right, left);\n\
        return result;\n\
    }\n\
\n\
    czm_raySegmentCollection result = czm_raySegmentCollectionNew(czm_raySegment(min(left.start, right.start), max(left.stop, right.stop)));\n\
    return result;\n\
}\n\
\n\
///////////////////////////////////////////////////////////////////////////////\n\
\n\
/**\n\
 * Determines the intersection of two time intervals.  If they do not intersect, an\n\
 * empty time interval, <code>czm_emptyRaySegment</code>, is returned.\n\
 *\n\
 * @name czm_intersection\n\
 * @glslFunction \n\
 *\n\
 * @param {czm_raySegment} left One interval.\n\
 * @param {czm_raySegment} right The other interval.\n\
 *\n\
 * @returns {czm_raySegment} The intersection of <code>left</code> and <code>right</code>.\n\
 * \n\
 * @see czm_unionRaySegments\n\
 * @see czm_subtraction  \n\
 * @see czm_isEmpty\n\
 *\n\
 * @example\n\
 * czm_raySegment i0 = czm_intersection(czm_raySegment(1.0, 2.0), czm_raySegment(3.0, 4.0));    // Empty\n\
 * czm_raySegment i1 = czm_intersection(czm_raySegment(1.0, 3.0), czm_raySegment(2.0, 4.0));    // (2.0, 3.0)\n\
 */\n\
czm_raySegment czm_intersection(czm_raySegment left, czm_raySegment right)\n\
{\n\
    float stop = min(left.stop, right.stop);\n\
    \n\
    if (stop < 0.0)\n\
    {\n\
        return czm_emptyRaySegment;\n\
    }\n\
\n\
    float start = max(left.start, right.start);\n\
    \n\
    if (stop < start)\n\
    {\n\
        return czm_emptyRaySegment;\n\
    }\n\
\n\
    czm_raySegment s = czm_raySegment(start, stop);\n\
    return s;\n\
}\n\
\n\
czm_raySegmentCollection czm_intersection(czm_raySegmentCollection left, czm_raySegment right)\n\
{\n\
    if (left.count == 1)\n\
    {\n\
        czm_raySegment intersection = czm_intersection(left.intervals[0], right);\n\
        \n\
        if (czm_isEmpty(intersection))\n\
        {\n\
            czm_raySegmentCollection result = czm_raySegmentCollectionNew();\n\
            \n\
            return result;\n\
        }\n\
        else\n\
        {\n\
            czm_raySegmentCollection result = czm_raySegmentCollectionNew(intersection);\n\
            \n\
            return result;\n\
        }\n\
    }\n\
\n\
    czm_raySegmentCollection result = czm_raySegmentCollectionNew();\n\
    \n\
    for (int leftIndex = 0; leftIndex < czm_raySegmentCollectionCapacity; ++leftIndex)\n\
    {\n\
        if (leftIndex < left.count)\n\
        {\n\
            czm_raySegment intersection = czm_intersection(left.intervals[leftIndex], right);\n\
            if (!czm_isEmpty(intersection))\n\
            {\n\
                czm_insertAt(result, intersection, result.count);\n\
            }\n\
        }\n\
        else\n\
        {\n\
            break;\n\
        }\n\
    }\n\
\n\
    return result;\n\
}\n\
\n\
czm_raySegmentCollection czm_intersection(czm_raySegmentCollection left, czm_raySegmentCollection right)\n\
{\n\
    if (right.count == 1)\n\
    {\n\
        if (left.count == 1)\n\
        {\n\
            czm_raySegment intersection = czm_intersection(left.intervals[0], right.intervals[0]);\n\
            \n\
	        if (czm_isEmpty(intersection))\n\
	        {\n\
	            czm_raySegmentCollection result = czm_raySegmentCollectionNew();\n\
	            \n\
	            return result;\n\
	        }\n\
	        else\n\
	        {\n\
	            czm_raySegmentCollection result = czm_raySegmentCollectionNew(intersection);\n\
	            \n\
	            return result;\n\
	        }\n\
        }\n\
        else\n\
        {\n\
            czm_raySegmentCollection result = czm_intersection(left, right.intervals[0]);\n\
            \n\
            return result;\n\
        }\n\
    }\n\
\n\
    czm_raySegmentCollection result = czm_raySegmentCollectionNew();\n\
    \n\
    if (left.count > 0 && right.count > 0)\n\
    {\n\
        for (int leftIndex = 0; leftIndex < czm_raySegmentCollectionCapacity; ++leftIndex)\n\
        {\n\
            if (leftIndex < left.count)\n\
            {\n\
                for (int rightIndex = 0; rightIndex < czm_raySegmentCollectionCapacity; ++rightIndex)\n\
                {\n\
                    // TODO:  Figure out why this isn't \"rightIndex < right.count\".\n\
                    if (rightIndex <= right.count && left.intervals[leftIndex].stop >= right.intervals[rightIndex].start)\n\
                    {\n\
	                    czm_raySegment intersection = czm_intersection(left.intervals[leftIndex], right.intervals[rightIndex]);\n\
	                    if (!czm_isEmpty(intersection))\n\
	                    {\n\
                            czm_insertAt(result, intersection, result.count);\n\
                        }\n\
                    }\n\
                    else\n\
                    {\n\
                        break;\n\
	                }\n\
                }\n\
            }\n\
            else\n\
            {\n\
                break;\n\
            }\n\
        }\n\
    }\n\
\n\
    return result;\n\
}\n\
\n\
///////////////////////////////////////////////////////////////////////////////\n\
\n\
/**\n\
 * Subtracts one time interval from another, resulting in zero, one, or two non-empty time intervals.\n\
 * \n\
 * @name czm_subtraction\n\
 * @glslFunction\n\
 *\n\
 * @param {czm_raySegment} outer The outer interval.\n\
 * @param {czm_raySegment} inner The inner interval that is subtracted from <code>outer</code>.\n\
 * \n\
 * @returns {czm_raySegmentCollection} The time intervals resulting from <code>outer - inner</code>.\n\
 *\n\
 * @see czm_intersection\n\
 * @see czm_unionRaySegments\n\
 *\n\
 * @example\n\
 * czm_raySegmentCollection i0 = czm_subtraction(\n\
 *   czm_raySegment(1.0, 4.0), czm_raySegment(2.0, 3.0)); \n\
 * // i0 is [(1.0, 2.0), (3.0, 4.0)]\n\
 * \n\
 * czm_raySegmentCollection i1 = czm_subtraction(\n\
 *   czm_raySegment(1.0, 4.0), czm_raySegment(1.0, 2.0));\n\
 * // i1 is [(2.0, 4.0)]\n\
 * \n\
 * czm_raySegmentCollection i2 = czm_subtraction(\n\
 *   czm_raySegment(1.0, 4.0), czm_raySegment(5.0, 6.0));\n\
 * // i2 is []\n\
 */\n\
czm_raySegmentCollection czm_subtraction(czm_raySegment outer, czm_raySegment inner)\n\
{\n\
    // This function has ANGLE workarounds:  http://code.google.com/p/angleproject/issues/detail?id=185\n\
\n\
    czm_raySegmentCollection i = czm_raySegmentCollectionNew();\n\
\n\
    czm_raySegment intersection = czm_intersection(outer, inner);\n\
    \n\
    if (czm_isEmpty(intersection) || (intersection.start == intersection.stop))\n\
    {\n\
        // No intersection, or intersection at an end point; subtraction doesn't change outer.\n\
        i.count = 1;\n\
        i.intervals[0] = outer;\n\
    }\n\
    else\n\
    {\n\
        if ((intersection.start == outer.start) && (intersection.stop == outer.stop))\n\
        {\n\
            // outer and inner are the same interval; subtracting them yields empty intervals.\n\
            i.count = 0;\n\
        }\n\
        else if (intersection.start == outer.start)\n\
        {\n\
            // inner is completely inside outer, and touching the left boundary; subtraction yields one interval\n\
            i.count = 1;\n\
            i.intervals[0] = czm_raySegment(inner.stop, outer.stop);\n\
        }\n\
        else if (intersection.stop == outer.stop)\n\
        {\n\
            // inner is completely inside outer, and touching the right boundary; subtraction yields one interval\n\
            i.count = 1;\n\
            i.intervals[0] = czm_raySegment(outer.start, inner.start);\n\
        }\n\
        else\n\
        {\n\
            // inner is completely inside outer, but not on a boundary; break outer into two intervals\n\
            i.count = 2;\n\
            i.intervals[0] = czm_raySegment(outer.start, inner.start);\n\
            i.intervals[1] = czm_raySegment(inner.stop, outer.stop);\n\
        }\n\
    }\n\
    \n\
    return i;\n\
}\n\
\n\
/**\n\
 * DOC_TBA\n\
 *\n\
 * @name czm_subtraction\n\
 */\n\
czm_raySegmentCollection czm_subtraction(czm_raySegmentCollection left, czm_raySegment right)\n\
{\n\
    if (left.count == 1)\n\
    {\n\
        czm_raySegmentCollection result = czm_subtraction(left.intervals[0], right);\n\
        \n\
        return result;\n\
    }\n\
\n\
    czm_raySegmentCollection result = czm_raySegmentCollectionNew();\n\
    \n\
    for (int leftIndex = 0; leftIndex < czm_raySegmentCollectionCapacity; ++leftIndex)\n\
    {\n\
        if (leftIndex < left.count)\n\
        {\n\
            czm_raySegmentCollection segments = czm_subtraction(left.intervals[leftIndex], right);\n\
            if (segments.count != 0)\n\
            {\n\
                czm_insertAt(result, segments, result.count);\n\
            }\n\
        }\n\
        else\n\
        {\n\
            break;\n\
        }\n\
    }\n\
\n\
    return result;\n\
}\n\
\n\
/**\n\
 * DOC_TBA\n\
 *\n\
 * @name czm_subtraction\n\
 */\n\
czm_raySegmentCollection czm_subtraction(czm_raySegmentCollection left, czm_raySegmentCollection right)\n\
{\n\
    if (right.count == 1)\n\
    {\n\
        if (left.count == 1)\n\
        {\n\
            czm_raySegmentCollection result = czm_subtraction(left.intervals[0], right.intervals[0]);\n\
            \n\
            return result;\n\
        }\n\
        else\n\
        {\n\
	        czm_raySegmentCollection result = czm_subtraction(left, right.intervals[0]);\n\
	        \n\
	        return result;\n\
        }\n\
    }\n\
\n\
    // PERFORMANCE TODO: See if these two calls (with separate loop iterations) can be combined into one loop.\n\
    czm_raySegmentCollection complement = czm_complement(right);\n\
\n\
    czm_raySegmentCollection result = czm_intersection(left, complement);\n\
    \n\
    return result;\n\
}\n\
";
});